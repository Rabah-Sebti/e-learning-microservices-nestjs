import { Injectable } from '@nestjs/common';

@Injectable()
export class AboutService {
  getAboutData() {
    return {
      description:
        'hehejhe ehedhedhe djehdejdhe dehed edhjedh edhjedehdhejde dejdedh edhej',
      about_point_1: 'Point 1',
      about_point_2: 'Point 2',
      about_point_3: 'Point 3',
      about_point_4: 'Point 4',
    };
  }
}
