import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async getHello() {
    return "Server is running!";
  }
}
