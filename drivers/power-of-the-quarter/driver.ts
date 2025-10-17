'use strict';

// import { v4 as uuid } from 'uuid';
import Homey from 'homey';

class PowerOfTheQuarterDriver extends Homey.Driver {
    async onInit() {
        this.log('Power of the quarter driver has been initialized');
    }


    async onPairListDevices() {
        const { v4: uuid } = await import('uuid');
        return [
            {
                name: 'Power of the quarter',
                data: {
                    id: uuid()
                }
            }
        ];
    }
}

module.exports = PowerOfTheQuarterDriver;
