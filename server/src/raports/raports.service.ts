import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';

@Injectable()
export class RaportsService {
  generateFastRaport() {
    const pathHere = path.join(__dirname, '/../templates/raports/test.ejs');
    const html = fs.readFileSync(pathHere, 'utf8');

    const renderedHtml = ejs.render(html, { user: { name: 'Andrzej' } });

    const options: pdf.CreateOptions = {
      format: 'A4',
      footer: {
        height: '100px',
        contents: { first: "Hello what's app <h1>HELLO</h1>" },
      },
    };

    const fileName = 'test';
    pdf
      .create(renderedHtml, options)
      .toFile(`./assets/pdf/${fileName}.pdf`, function(err, res) {
        if (err) return console.log(err);
        // console.log(res);
        console.log(process.env.PDFS_BASE_URL + fileName + '.pdf');
      });
    return 'Hello';
  }
}
