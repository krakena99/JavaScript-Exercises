class Hotel {
    constructor(name, capacity, bookings, currentBookingNumber) {
        this.name = name;
        this.capacity = [Math.round(capacity*0.50), Math.round(capacity*0.30), Math.round(capacity*0.20)];
        this.capacity[0] += capacity - (this.capacity[0]+this.capacity[1]+this.capacity[2]);
        this.bookings = [];
        this.currentBookingNumber = 1;
    }

    roomsPricing() {
        let obj = {
            single: 50,
            double: 90,
            maisonette:135
        }

        return obj;
    }

    servicesPricing() {
        let obj = {
            food: 10,
            drink: 15,
            housekeeping: 25
        }

        return obj;
    }

    //rentAroom = works
    rentARoom(clientName, roomType, nights) {
        if (this.roomCheck(roomType, 'occupy')) {
            let client = {
                clientName,
                roomType,
                nights,
                bookingNumber: this.currentBookingNumber
            }
            this.bookings.push(client);

            this.currentBookingNumber++;
            return `Enjoy your time here Mr./Mrs. ${client.clientName}. Your booking is ${client.bookingNumber}.`;
        } else {
            let error = `No ${roomType} rooms available!`;
            if (this.roomCheck('single', '')) {
                error += ` Available single rooms: ${this.capacity[0]}.`;
            }
            if (this.roomCheck('double', '')) {
                error += ` Available double rooms: ${this.capacity[1]}.`;
            }
            if (this.roomCheck('maisonette', '')) {
                error += ` Available maisonette rooms: ${this.capacity[2]}.`;
            }
            
            return error;
        }
    }

    //roomService = works
    roomService(currentBookingNumber, serviceType) {
        let clientCheck = false;

        if (!this.serviceCheck(serviceType)) {
            return `We do not offer ${serviceType} service.`
        } else {
            for (let i = 0; i < this.bookings.length; i++) {
                if (this.bookings[i].bookingNumber === currentBookingNumber) {
                    if (this.bookings[i].services === undefined) {
                        this.bookings[i].services = [];
                    }
                    this.bookings[i].services.push(serviceType);
                    clientCheck = true;

                    return `Mr./Mrs. ${this.bookings[i].clientName}, Your order for ${serviceType} service has been successful.`
                }
            }
        }

        if (!clientCheck) {
            return `The booking ${currentBookingNumber} is invalid.`
        }      
    }

    //checkOut = works
    checkOut(currentBookingNumber) {
        let clientCheck = false;
        let message = '';
        
        for (let i = 0; i < this.bookings.length; i++) {
            if (this.bookings[i].bookingNumber === currentBookingNumber) {
                clientCheck = true;
                

                let totalMoney = 0;
                let totalServiceMoney = 0;

                if (this.bookings[i].roomType === 'single') {
                    totalMoney += 50*this.bookings[i].nights;
                }
                if (this.bookings[i].roomType === 'double') {
                    totalMoney += 90*this.bookings[i].nights;
                }
                if (this.bookings[i].roomType === 'maisonette') {
                    totalMoney += 135*this.bookings[i].nights;
                }
                this.roomCheck(this.bookings[i].roomType, 'checkout')

                if (this.bookings[i].services != undefined) {
                    for (const service of this.bookings[i].services) {
                        if (service === 'food') {
                            totalServiceMoney += 10;
                        }
                        if (service === 'drink') {
                            totalServiceMoney += 15;
                        }
                        if (service === 'housekeeping') {
                            totalServiceMoney += 25;
                        }
                    }
                }

                message += `We hope you enjoyed your time here, Mr./Mrs. ${this.bookings[i].clientName}. The total amount of money you have to pay is ${totalMoney + totalServiceMoney} BGN.`;
                if (totalServiceMoney > 0) {
                    message += ` You have used additional room services, costing ${totalServiceMoney} BGN.`;
                }
                
                this.bookings.splice(i, 1);
                return message;
            }
        }

        if (!clientCheck) {
            return `The booking ${currentBookingNumber} is invalid.`
        }    
    }

    //report - works
    report() {
        let report = `${this.name.toUpperCase()} DATABASE:\n--------------------`

        if (this.bookings.length <= 0) {
            report += `\nThere are currently no bookings.`
            return report;
        } else {
                for (const booking of this.bookings) {
                report += `\nbookingNumber - ${booking.bookingNumber}`;
                report += `\nclientName - ${booking.clientName}`;
                report += `\nroomType - ${booking.roomType}`;
                report += `\nnights - ${booking.nights}`;

                if (booking.services != undefined) {
                    report += `\nservices: ${booking.services.join(`, `)}`;
                }
                report += "\n----------"
            }
        }

        var newStr = report.substring(0, report.length - 11);
        return newStr;
    }

    //roomCheck - works
    roomCheck(roomType, task) {
        let singleRooms = this.capacity[0];
        let doubleRooms = this.capacity[1];
        let maisonetteRooms = this.capacity[2];

        if (roomType === 'single' && singleRooms >= 1) {
            if (task === 'occupy') {
                this.capacity[0]--;
            }
            if (task === 'checkout') {
                this.capacity[0]++;
            }
            return true;
        }

        if (roomType === 'double' && doubleRooms >= 1) {
            if (task === 'occupy') {
                this.capacity[1]--;
            }
            if (task === 'checkout') {
                this.capacity[1]++;
            }
            return true;
        }

        if (roomType === 'maisonette' && maisonetteRooms >= 1) {
            if (task === 'occupy') {
                this.capacity[2]--;
            }
            if (task === 'checkout') {
                this.capacity[2]++;
            }
            return true;
        }

        return false;
    }

    //serviceCheck - works
    serviceCheck(serviceType) {
        if (serviceType === 'food' || serviceType === 'drink' || serviceType === 'housekeeping') {
            return true;
        }

        return false;
    }
}

let hotel = new Hotel('HotUni', 11);
console.log(hotel.capacity);
