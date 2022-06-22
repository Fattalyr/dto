import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { USERS_EVENTS } from './common/constants';
import { TcpCommonExceptionFilter } from './common/filters';
import { IResponse, IUser } from './common/types';
import {
  EditAddressesBodyDto,
  GetUserBodyDto,
} from './dto';
import { UsersService } from './services';
import { IEditAddresses } from './types';


@UseFilters(new TcpCommonExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_EVENTS.USER_GET_USER)
  public async getUser(data: GetUserBodyDto): Promise<IResponse<{ user: IUser }>> {
    return await this.usersService.getUser(data);
  }

  @MessagePattern(USERS_EVENTS.USER_EDIT_ADDRESSES)
  public async editAddresses(data: EditAddressesBodyDto): Promise<IResponse<IEditAddresses>> {
    return await this.usersService.editAddresses(data);
  }
}
