import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FoglalasDto } from './Foglalas.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getFoglalas() {
    let errors = []
    return {nev: "", email: "", datum: 0, letszam: undefined, errors: errors }
  }

  @Post()
  @Render('index')
  postFoglalas(@Body() foglalas: FoglalasDto, @Res() res: any) {
    let errors = []

    if (foglalas.nev.length < 3 || !foglalas.nev.includes(" ")) {
      errors.push("Adjon meg egy teljes nevet! \n")
    }
    if (!foglalas.email.includes("@") || !foglalas.email.includes(".")) {
      errors.push("Az e-mail cím helytelen. \n")
    }
    if (foglalas.email.split('@')[0].length < 1 || foglalas.email.split('@')[1].length < 1) {
      errors.push("Az e-mail cím érvénytelen. \n")
    }
    if (!foglalas.datum) {
      errors.push("Dátumot és időt kötelező megadni.")

    }
    if ((Date.parse(foglalas.datum.toString()) - Date.parse(new Date().toString())<0)) {
      errors.push("A dátum nem lehet a mai nap előtt. \n")
    }
    if (foglalas.letszam < 1 || foglalas.letszam > 10) {
      errors.push("A foglalásnak 1 és 10 között kell lennie. \n")
    }
    if (errors.length == 0) {
      res.redirect("/siker")
    }
    else return { nev: foglalas.nev, email: foglalas.email, datum: foglalas.datum, letszam: foglalas.letszam, errors: errors }
  }
  @Get('/siker')
  @Render('siker')
  getSiker() {
    
  }
}
