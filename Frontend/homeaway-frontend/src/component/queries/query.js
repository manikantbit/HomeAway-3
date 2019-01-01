import gql from 'graphql-tag';

const users = gql`
    query users($email:String){
        users(email:$email){
            email
            first_name
            last_name
            profile_image
            about
            phone
            city
            company
            school
            hometown
            languages
            gender
        }
    }  
`;

const property = gql`
query property($email:String){
    property(email:$email){
        propid
        email
        location
        proptype
        headline
        noOfRooms
        noOfBath
        allowedGuest
        image1
        image2
        image3
        image4
        price
        amenities
        availFrom
        availTo
    }
}  
`;
const searchProperty= gql`
query searchProperty($loc:String,$allowedGuest: Int){
    searchProperty(loc:$loc,allowedGuest:$allowedGuest){
            propid
            email
            location
            proptype
            headline
            noOfRooms
            noOfBath
            allowedGuest
            image1
            image2
            image3
            image4
            price
            amenities
            availFrom
            availTo
        }
    }
    `;

const propertyByID = gql`
query propertyByID($propid:Int){
    propertyByID(propid:$propid){
        propid
        email
        location
        proptype
        headline
        noOfRooms
        noOfBath
        allowedGuest
        image1
        image2
        image3
        image4
        price
        amenities
        availFrom
        availTo
    }
}  
`;

const bookings= gql`
query bookings($email:String){
    bookings(email:$email){
        propid
        email
        location
        proptype
        headline
        noOfRooms
        noOfBath
        allowedGuest
        image1
        image2
        image3
        image4
        price
        amenities
        bookedFrom
        bookedTo
    }
}
`;
export { users, property,searchProperty,propertyByID,bookings};