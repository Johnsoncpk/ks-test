import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BorrowService } from '../services/borrow.service';
import { GetUserBorrowsDto } from '../dto/borrow.dto';
import { Borrows } from '../entities/entities/Borrows';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly borrowService: BorrowService) {}

  @Get(':userId/borrows')
  @ApiOperation({ summary: 'Get all borrow records for a user' })
  @ApiResponse({
    status: 200,
    description: 'Returns all borrow records for the user',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserBorrows(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Borrows[]> {
    const getUserBorrowsDto = new GetUserBorrowsDto();
    getUserBorrowsDto.userId = userId;
    return this.borrowService.getBorrowsByUserId(getUserBorrowsDto);
  }
}
