import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FoglalasDto } from './Foglalas.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getFoglalas() {
    let errors = []
    return {errors: errors, nev: undefined, email: undefined, datum: undefined, letszam: undefined}
  }

  @Post()
  @Render('index')
  postFoglalas(@Body() foglalas: FoglalasDto, @Res() res: any) {
    let errors = []
    
    if (foglalas.nev.length < 3 || !foglalas.nev.includes(" ")) {
      errors.push("Adjon meg egy teljes nevet!")
    }
    if (!foglalas.email.includes("@") || !foglalas.email.includes(".")) {
      errors.push("Az e-mail cím helytelen.")
    }
    if (foglalas.email.split('@')[0].length < 1 || foglalas.email.split('@')[1].length < 1 ) {
      errors.push("Az e-mail cím érvénytelen.")
    }
    if (foglalas.datum > new Date()) {
      errors.push("A dátum nem lehet a mai nap előtt.")
    }
    if (foglalas.letszam < 1 || foglalas.letszam > 10) {
      errors.push("A foglalásnak 1 és 10 között kell lennie.")
    }
    console.log(foglalas)
    if (errors.length == 0) {
      return res.redirect("/siker")
    }
    else return {errors: errors, nev: foglalas.nev, email: foglalas.email, datum: foglalas.datum, letszam: foglalas.letszam}
  }
  @Get('/siker')
  @Render('siker')
  getSiker() {

  }
}
