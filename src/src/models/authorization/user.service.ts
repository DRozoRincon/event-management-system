import { BaseQuery } from "../../config/base-query";

export class UserService extends BaseQuery {
  async verifyIfExistUser(
    email: string
  ): Promise<{ password: string; id: number } | undefined> {
    try {
      return (
        await this.query("SELECT id, password FROM users WHERE email = $1", [
          email,
        ])
      )?.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async createUser(userValues: string[]) {
    try {
      return await this.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        userValues
      );
    } catch (error) {
      throw error;
    }
  }
}
