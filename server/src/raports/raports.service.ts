import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import * as pdf from 'html-pdf';
import * as moment from 'moment';
import * as fs from 'fs';
import * as ejs from 'ejs';
import { FastRaportInput } from './dto/fast-raport.input';
import { CompanyRepository } from 'src/auth/company.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RaportsService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async generateFastRaport(
    fastRaportInput: FastRaportInput,
    companyId: string,
  ): Promise<string> {
    const company = await this.companyRepository.findOne({ id: companyId });

    let summaryCosts = {
      amount: 0,
      cost: 0,
      totalCost: 0,
    };

    fastRaportInput.estimate.map(({ amount, cost, totalCost }) => {
      summaryCosts.amount = summaryCosts.amount + amount;
      summaryCosts.cost = summaryCosts.cost + cost;
      summaryCosts.totalCost = summaryCosts.totalCost + totalCost;
    });

    const ejsTemplate = fs.readFileSync('./templates/index.ejs', 'utf8');

    const renderedHtml = ejs.render(ejsTemplate, {
      data: {
        ...fastRaportInput,
        date: moment().format('DD-MM-YYYY'),
      },
      summaryCosts,
      company,
    });

    const options: pdf.CreateOptions = {
      format: 'A4',
      footer: {
        height: '40px',
        contents: {
          default:
            "<p style='font-weight: 700 !important;'>EXELO CMM dla serwisów samochodowych</p>",
        },
      },
    };

    const randomFileName = uuidv4();

    pdf
      .create(renderedHtml, options)
      .toFile(`./assets/pdf/${randomFileName}.pdf`, err => {
        if (err) {
          Logger.error(
            `Error with create fast Raport on name: ${randomFileName} `,
          );
          throw new BadRequestException();
        }
      });

    console.log(process.env.PDFS_BASE_URL + randomFileName + '.pdf');
    return process.env.PDFS_BASE_URL + randomFileName + '.pdf';
  }
}
