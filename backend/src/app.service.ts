import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async getHello(): Promise<{ text: string }> {
    return { text: "Hello World!" };
  }
}
