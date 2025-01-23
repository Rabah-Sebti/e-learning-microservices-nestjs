export class PasswordResetEvent {
  constructor(
    public readonly email: string,
    public readonly resetLink: string,
  ) {}
}
