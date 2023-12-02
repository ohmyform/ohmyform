import { Field, ObjectType } from '@nestjs/graphql'
import { GeoLocationEmbedded } from '../../entity/embedded/geo.location.embedded'

@ObjectType('GeoLocation')
export class GeoLocationModel {
  @Field({ nullable: true })
    country?: string

  @Field({ nullable: true })
    city?: string

  constructor(geo: GeoLocationEmbedded) {
    this.country = geo.country
    this.city = geo.city
  }
}
