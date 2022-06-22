import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';

import { Types } from 'mongoose';

import { IResponse, IUser } from '../common/types';
import {
  EditAddressesBodyDto,
  GetUserBodyDto,
} from '../dto';
import { IEditAddresses } from '../types';


@Injectable()
export class UsersService {
  constructor() {
  }

  public async getUser(data: GetUserBodyDto): Promise<IResponse<{ user: IUser }>> {
    if (!data?._id || !Types.ObjectId.isValid(data._id)) {
      throw new BadRequestException('UserId is not valid ObjectId');
    }

    const user: IUser | null = {
      _id: new Types.ObjectId('62a9ef6adebb376060207f81'),
      firstName: 'Ray',
      middleName: 'Douglas',
      lastName: 'Bradbury',
      username: 'RBradbury',
      email: 'r.bradbury@gmail.com',
      avatar: '',
      addresses: [
        new Types.ObjectId('62af35c055db0b360f25ab2c'),
        new Types.ObjectId('62af35c055db0b360f25ab2d'),
        new Types.ObjectId('62af35e714b34fd70266786f'),
        new Types.ObjectId('62af35e714b34fd702667870'),
        new Types.ObjectId('62af36097dbfe2d5c1627eec'),
        new Types.ObjectId('62af36097dbfe2d5c1627eed'),
      ],
      phoneNumber: '',
      roles: [],
      orders: [],
      emailConfirmed: false,
      phoneConfirmed: false,
      deactivated: false,
    };

    if (!user) {
      throw new NotFoundException(`Cannot find user with _id ${data._id}`);
    }

    return {
      status: HttpStatus.OK,
      data: { user },
      errors: null,
    };
  }

  public async editAddresses(data: EditAddressesBodyDto): Promise<IResponse<IEditAddresses>> {
    const updatedUser = {
      _id: new Types.ObjectId('62a9ef6adebb376060207f81'),
      firstName: 'Ray',
      middleName: 'Douglas',
      lastName: 'Bradbury',
      username: 'RBradbury',
      email: 'r.bradbury@gmail.com',
      avatar: '',
      addresses: [
        {
          _id: new Types.ObjectId('62b1cfa3213655a4918adefc'),
          userId: new Types.ObjectId('62a9ef6adebb376060207f81'),
          country: 'USA',
          region: 'California',
          city: 'Los Angeles',
          street: 'Cheviot Drive',
          building: '39',
          flat: '125',
        },
        {
          _id: new Types.ObjectId('62b1cfa3213655a4918adefd'),
          userId: new Types.ObjectId('62a9ef6adebb376060207f81'),
          country: 'Armenia',
          city: 'Dilijan',
          street: 'Gai',
          building: '82',
          flat: '40',
        },
      ],
      phoneNumber: '',
      roles: [],
      orders: [],
      emailConfirmed: false,
      phoneConfirmed: false,
      deactivated: false,
    };

    if (!updatedUser) {
      throw new PreconditionFailedException('Cannot update addresses');
    }

    return {
      status: HttpStatus.OK,
      data: {
        user: updatedUser,
      },
      errors: null,
    };
  }
}
