import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/')
  findOne(
    @Query('sku')
    sku: string,
  ) {
    return this.filesService.findOne(sku);
  }
}
