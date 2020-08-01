import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { VehicleService } from './vehicle-service.entity';
import { CreateVehicleServiceDto } from './dto';
import { VehicleServiceService } from './vehicle-service.service';

@Resolver()
@UseGuards(AuthGuard)
export class VehicleServiceResolver {
  constructor(private vehicleServiceService: VehicleServiceService) {}

  @Query(() => [VehicleService])
  async getVehicleServices(@Args('vehicleId') vehicleId: string) {
    return await this.vehicleServiceService.getVehicleService(vehicleId);
  }

  @Mutation(() => VehicleService)
  async createVehicleService(
    @Args('createVehicleService')
    createVehicleServiceDto: CreateVehicleServiceDto,
  ): Promise<VehicleService> {
    return await this.vehicleServiceService.createVehicleService(
      createVehicleServiceDto,
    );
  }
}
