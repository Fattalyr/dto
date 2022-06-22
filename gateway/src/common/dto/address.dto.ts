import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';

import { Transform, Type } from 'class-transformer';
import { IsDefined, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Types } from 'mongoose';

import {
  POSTAL_CODE_MAX_LENGTH,
  POSTAL_CODE_MIN_LENGTH,
  POSTAL_CODE_REGEXP,
  PROPERTY_LENGTH_1,
  PROPERTY_LENGTH_4,
  PROPERTY_LENGTH_64,
} from '../constants';
import { maxLengthStringMessage, minLengthStringMessage, toObjectId } from '../helpers';
import { IAddress } from '../types';


export class AddressDto implements IAddress {
  @IsDefined()
  @Transform(toObjectId)
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsDefined()
  @Transform(toObjectId)
  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;

  @IsString({ message: 'Postal code must be a string' })
  @MinLength(PROPERTY_LENGTH_1, {
    message: minLengthStringMessage('Postal code', POSTAL_CODE_MIN_LENGTH),
  })
  @MaxLength(PROPERTY_LENGTH_64, {
    message: maxLengthStringMessage('Postal code', POSTAL_CODE_MAX_LENGTH),
  })
  @Matches(POSTAL_CODE_REGEXP, {
    message: 'Postal code can contain digits and hyphens only',
  })
  postalCode: string;

  @IsString({ message: 'Country must be a string' })
  @MinLength(PROPERTY_LENGTH_1, {
    message: minLengthStringMessage('Country', PROPERTY_LENGTH_1),
  })
  @MaxLength(PROPERTY_LENGTH_64, {
    message: maxLengthStringMessage('Country', PROPERTY_LENGTH_64),
  })
  country: string;

  @IsString({ message: 'Region must be a string' })
  @MaxLength(PROPERTY_LENGTH_64, {
    message: maxLengthStringMessage('Region', PROPERTY_LENGTH_64),
  })
  region: string;

  @IsString({ message: 'City must be a string' })
  @MinLength(PROPERTY_LENGTH_1, {
    message: minLengthStringMessage('City', PROPERTY_LENGTH_1),
  })
  @MaxLength(PROPERTY_LENGTH_64, {
    message: maxLengthStringMessage('City', PROPERTY_LENGTH_64),
  })
  city: string;

  @IsString({ message: 'Street must be a string' })
  @MinLength(PROPERTY_LENGTH_1, {
    message: minLengthStringMessage('Street', PROPERTY_LENGTH_1),
  })
  @MaxLength(PROPERTY_LENGTH_64, {
    message: maxLengthStringMessage('Street', PROPERTY_LENGTH_64),
  })
  street: string;

  @IsString({ message: 'Building must be a string' })
  @MinLength(PROPERTY_LENGTH_1, {
    message: minLengthStringMessage('Building', PROPERTY_LENGTH_1),
  })
  @MaxLength(PROPERTY_LENGTH_64, {
    message: maxLengthStringMessage('Building', PROPERTY_LENGTH_64),
  })
  building: string;

  @IsString({ message: 'Flat must be a string' })
  @MinLength(PROPERTY_LENGTH_1, {
    message: minLengthStringMessage('Flat', PROPERTY_LENGTH_1),
  })
  @MaxLength(PROPERTY_LENGTH_4, {
    message: maxLengthStringMessage('Flat', PROPERTY_LENGTH_4),
  })
  flat: string;
}

export class PartialAddressDto extends PartialType(AddressDto) {}

export class AddressEditableDto extends AddressDto implements Partial<IAddress> {
  @IsOptional()
  postalCode: string;

  @IsOptional()
  country: string;

  @IsOptional()
  region: string;

  @IsOptional()
  city: string;

  @IsOptional()
  street: string;

  @IsOptional()
  building: string;

  @IsOptional()
  flat: string;
}

export class AddAddressDto extends IntersectionType(
  PickType(AddressDto, [ 'city', 'street', 'building' ] as const),
  PickType(PartialAddressDto, [ 'postalCode', 'country', 'region', 'flat' ] as const),
) {}

export class UpdateAddressDto extends IntersectionType(
  PickType(AddressDto, ['_id'] as const),
  PickType(AddressEditableDto, [ 'postalCode', 'country', 'region', 'city', 'street', 'building', 'flat' ] as const),
) {}
