import { Resolver, Query } from '@nestjs/graphql';
import { RaportsService } from './raports.service';

@Resolver()
export class RaportsResolver {
  constructor(private raportsService: RaportsService) {}

  @Query(() => String)
  fastRaport() {
    return this.raportsService.generateFastRaport();
  }
}
