import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import ejs from 'ejs';

const buildQuote = async (res, data, dataQuote) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const ejsPath = path.join(__dirname, '..', 'doc', 'quote.ejs');
  const html = await ejs.renderFile(ejsPath, { data, dataQuote });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Aumenta el tiempo de espera de la operación a 60 segundos
  await page.setDefaultNavigationTimeout(80000);

  await page.setContent(html);

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  res.end(pdfBuffer);
}

const buildProForma = async (res, data, dataProforma) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const ejsPath = path.join(__dirname, '..', 'doc', 'proForma.ejs');
  const html = await ejs.renderFile(ejsPath, { data, dataProforma });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(80000);


  await page.setContent(html);

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  res.end(pdfBuffer);
}

const buildShip = async (res) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const ejsPath = path.join(__dirname, '..', 'doc', 'shipment.ejs');
  const html = await ejs.renderFile(ejsPath);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(80000);


  await page.setContent(html);

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  res.end(pdfBuffer);
}




export const pdf = { buildQuote, buildProForma, buildShip }
