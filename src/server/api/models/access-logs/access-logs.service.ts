import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessLog } from '../../../database/entities/access-log.entity';
import { CreateAccessLogDTO } from '../../../database/dto/access-log.dto';
import { Request, Response } from 'express';

@Injectable()
export class AccessLogsService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(AccessLog)
    private accessLogsRepository: Repository<AccessLog>,
  ) { }

  async create(req: Request, res: Response, resBody: any): Promise<any> {
    const UUID = require("uuidjs").generate();
    let result: boolean = false;
    try {
      result = await this.createRequestLog(UUID, req);
      result = await this.createResponseLog(UUID, req, res, resBody);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return result;

  }
  async createRequestLog(uuid: string, req: Request): Promise<any> {
    //
    // console.log(JSON.stringify(req.headers));
    const regionCode: string = typeof req.headers['region-code'] === 'string' ? req.headers['region-code'] : '';

    // let result: boolean = false;
    // try {
      const requestCreateAccessLogDTO = new CreateAccessLogDTO();
      requestCreateAccessLogDTO.logCode = uuid;
      requestCreateAccessLogDTO.regionCode = regionCode;
      requestCreateAccessLogDTO.userCode = '3';
      requestCreateAccessLogDTO.isAdmin = false;
      requestCreateAccessLogDTO.ip = req.ip;
      requestCreateAccessLogDTO.uri = req.url;
      requestCreateAccessLogDTO.method = req.method;
      requestCreateAccessLogDTO.header = JSON.stringify(req.headers);
      requestCreateAccessLogDTO.userAgent = JSON.stringify(req.headers['user-agent']);
      requestCreateAccessLogDTO.request = JSON.stringify(req.body);
      requestCreateAccessLogDTO.isActive = true;
      requestCreateAccessLogDTO.createdUser = '10';
      requestCreateAccessLogDTO.createdChannel = 1;
      requestCreateAccessLogDTO.updatedUser = '10';
      requestCreateAccessLogDTO.updatedChannel = 1;

      await this.accessLogsRepository.save(requestCreateAccessLogDTO);

    //   result = true;
    // } catch (error) {
    //   throw new InternalServerErrorException();
    // }

    // return result;
    return true;
  }

  async createResponseLog(uuid: string, req: Request, res: Response, resBody: any): Promise<any> {
    const regionCode: string = typeof req.headers['region-code'] === 'string' ? req.headers['region-code'] : '';
    // let result: boolean = false;
    // try {
      const responseCreateAccessLogDTO = new CreateAccessLogDTO();
      responseCreateAccessLogDTO.logCode = uuid;
      responseCreateAccessLogDTO.regionCode = regionCode;
      responseCreateAccessLogDTO.userCode = '3';
      responseCreateAccessLogDTO.isAdmin = false;
      responseCreateAccessLogDTO.statusCode = res.statusCode;
      responseCreateAccessLogDTO.response = resBody;
      responseCreateAccessLogDTO.isActive = true;
      responseCreateAccessLogDTO.createdUser = '10';
      responseCreateAccessLogDTO.createdChannel = 1;
      responseCreateAccessLogDTO.updatedUser = '10';
      responseCreateAccessLogDTO.updatedChannel = 1;

      await this.accessLogsRepository.save(responseCreateAccessLogDTO);

    //   result = true;
    // } catch (error) {
    //   throw new InternalServerErrorException();
    // }

    // return result;
    return true;
  }
}
