import { UseGuards, Logger } from '@nestjs/common';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { GetCompanyId } from '../auth/get-company-id.decorator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { UpdateVehicleInput, CreateNewVehicleAndCustomerInput } from './dto';

@Resolver()
@UseGuards(AuthGuard)
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}

  @Query(() => [Vehicle])
  async getAllVehicles(@GetCompanyId() companyId: string): Promise<Vehicle[]> {
    return this.vehicleService.getAllVehicles(companyId);
  }

  @Mutation(() => Boolean, { nullable: true })
  async uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: FileUpload[],
  ) {
    Promise.all(files).then(files => {
      files.map(file => {
        const { createReadStream, filename } = file;
        new Promise(async (resolve, reject) =>
          createReadStream()
            .pipe(createWriteStream(`./uploads/${filename}`))
            .on('finish', () => resolve(true))
            .on('error', () => {
              Logger.error(
                `Error with VEHICLE upload file in vehicle.resolver filename: ${filename}`,
              );
              reject(false);
            }),
        );
      });
    });

    return true;
  }

  @Mutation(() => Vehicle)
  async updateVehicleInfo(
    @Args('updateVehicle') updateVehicleInput: UpdateVehicleInput,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true })
    image: FileUpload,
    @GetCompanyId() companyId: string,
  ): Promise<Vehicle> {
    return this.vehicleService.updateVehicleInfo(
      updateVehicleInput,
      image,
      companyId,
    );
  }

  @Mutation(() => String)
  async uploadVehicleImage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args('vehicleId') vehicleId: string,
    @GetCompanyId() companyId: string,
  ): Promise<string> {
    return await this.vehicleService.uploadVehicleImage(
      file,
      vehicleId,
      companyId,
    );
  }

  @Mutation(() => Vehicle)
  async createNewVehicleWithCustomer(
    @Args('createNewVehicleAndCustomerInput')
    createNewVehicleAndCustomerInput: CreateNewVehicleAndCustomerInput,
    @Args({ name: 'vehicleImage', type: () => GraphQLUpload, nullable: true })
    vehicleImage: FileUpload,
    @GetCompanyId() companyId: string,
  ): Promise<Vehicle> {
    console.log(vehicleImage);
    return this.vehicleService.createNewVehicleWithCustomer(
      createNewVehicleAndCustomerInput,
      vehicleImage,
      companyId,
    );
  }
}
