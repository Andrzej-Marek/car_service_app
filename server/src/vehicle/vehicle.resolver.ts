import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards, UploadedFile } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { VehicleService } from './vehicle.service';
import { CreateNewVehicleAndCustomerInput } from './dto/create-vehicle-and-customer.input';
import { GetCompanyId } from 'src/auth/get-company-id.decorator';
import { Vehicle } from './vehicle.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@Resolver()
@UseGuards(AuthGuard)
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}

  @Query(() => [Vehicle])
  async getAllVehicles(@GetCompanyId() companyId: string): Promise<Vehicle[]> {
    return this.vehicleService.getAllVehicles(companyId);
  }

  // @Mutation(() => Boolean)
  // async uploadFile(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file,
  //   { createReadStream, filename }: FileUpload,
  // ) {
  //   console.log(123);

  //   return new Promise(async (resolve, reject) =>
  //     createReadStream()
  //       .pipe(createWriteStream(`./uploads/${filename}`))
  //       .on('finish', () => resolve(true))
  //       .on('error', () => reject(false)),
  //   );
  // }

  @Mutation(() => Boolean, { nullable: true })
  async uploadFile(@Args({ name: 'file', type: () => GraphQLUpload }) image) {
    // Do stuff with image...
    console.log('here');
  }

  @Mutation(() => Vehicle)
  async createNewVehicleWithCustomer(
    @Args('createNewVehicleAndCustomerInput')
    createNewVehicleAndCustomerInput: CreateNewVehicleAndCustomerInput,
    @GetCompanyId() companyId: string,
  ): Promise<Vehicle> {
    return this.vehicleService.createNewVehicleWithCustomer(
      createNewVehicleAndCustomerInput,
      companyId,
    );
  }
}
