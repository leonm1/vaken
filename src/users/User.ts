import { Typegoose, prop, Ref, arrayProp } from 'typegoose';
/* import bcrypt from 'bcrypt'; */

/**
 * Typegoose's equivalent to Mongoose pre-hook: On user save password, hash password
 */
/*
@pre<User>('save', _: Promise<any> : Function => {
  bcrypt.hash(this.password, 10, function (err: Error, hash: string){
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  })
})*/

enum UserRole {
  ADMIN = 'admin',
  APPLICANT = 'applicant',
  GUEST = 'guest',
  SPONSOR = 'sponsor',
  MENTOR = 'mentor',
  VOLUNTEER = 'volunteer',
}

enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}

class Demographic extends Typegoose {
  @prop()
  name?: string;

  @prop()
  school?: string;

  @prop()
  graduationYear?: number;

  @prop({ enum: Gender })
  gender?: Gender;

  @arrayProp({ items: String })
  majors?: string[];

  @prop()
  over21?: boolean;
}

class AppStatus extends Typegoose {
  @prop()
  submittedDate?: Date;

  @prop()
  confirmationDate?: Date;

  @prop()
  verified: boolean = false;

  @prop()
  submitted: boolean = false;

  @prop()
  accepted: boolean = false;

  @prop()
  confirmed: boolean = false;

  @prop()
  rejected: boolean = false;

  @prop()
  declined: boolean = false;
}

class Application extends Typegoose {
  @arrayProp({ items: String })
  essays?: string[];
}

class Confirmation extends Typegoose {
  @arrayProp({ items: String })
  essays?: string[];
}

class UserModel extends Typegoose {
  @prop()
  password?: string;

  @prop({ required: true })
  email: string = '';

  @arrayProp({ items: Object, enum: UserRole, required: true })
  roles: UserRole[] = [];

  @prop({ ref: Demographic })
  demographic?: Ref<Demographic>;

  @prop({ ref: AppStatus })
  appStatus?: Ref<AppStatus>;

  @prop({ ref: Application })
  application?: Ref<Application>;

  @prop({ ref: Confirmation })
  confirmation?: Ref<Confirmation>;
}
const USER = new UserModel().getModelForClass(UserModel);

// export default User;
export { UserModel, USER };