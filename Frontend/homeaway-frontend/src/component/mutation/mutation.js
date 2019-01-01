import gql from 'graphql-tag';

const signup = gql`
    mutation signup($first_name: String, $last_name: String, $email: String,$password:String,$type:String){
        signup(first_name: $first_name, last_name: $last_name, email: $email,password:$password,type:$type){
            first_name
            last_name
            email
            type
            token
        }
    }
`;

const login = gql`
    mutation login( $email: String,$password:String,$type:String){
        login(email: $email,password:$password,type:$type){
            first_name
            last_name
            email
            type
            token
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

const postProfile = gql`
    mutation postProfile( $email: String,
        $first_name:String,
        $last_name:String,
        $about:String,
        $phone:String,
        $city:String,
        $company:String,
        $school:String,
        $hometown:String,
        $languages:String,
        $gender:String){
        postProfile(email: $email,
            first_name:$first_name,
            last_name:$last_name,
            about:$about,
            phone:$phone,
            city:$city,
            company:$company,
            school:$school,
            hometown:$hometown,
            languages: $languages,
            gender: $gender
        ){
            first_name
            last_name
            email
            type
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

const postOrder = gql`
mutation postOrder(
      $first_name:String,
      $last_name:String,
      $email:String, 
      $propid:Int,
      $location:String,
      $headline:String,
      $noOfRooms:Int,
      $noOfBath:Int,
      $allowedGuest:Int,
      $image1:String,
      $image2:String,
      $image3:String,
      $image4:String,
      $price:Int,
      $amenities:String,
      $phone:Int,
      $bookedFrom:String,
      $bookedTo:String,
      $nights:String) {
    postOrder( first_name:$first_name,
        last_name:$last_name,
        email:$email, 
        propid:$propid,
        location:$location,
        headline:$headline,
        noOfRooms:$noOfRooms,
        noOfBath:$noOfBath,
        allowedGuest:$allowedGuest,
        image1:$image1,
        image2:$image2,
        image3:$image3,
        image4:$image4,
        price:$price,
        amenities:$amenities,
        phone:$phone,
        bookedFrom:$bookedFrom,
        bookedTo:$bookedTo,
        nights:$nights){
            bookid
            first_name
            last_name
            email 
            propid
            location
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
            phone
            bookedFrom
            bookedTo
            nights
        }
    }
`;

const logout = gql`
    mutation logout( $email: String){
        logout(email:$email){
            email
        }

        }
`;

export {signup,login,logout,postProfile,postOrder};