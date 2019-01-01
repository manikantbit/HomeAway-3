const graphql = require('graphql');
const _ = require('lodash');
var User = require('../../model/user');
var Property = require('../../model/property');
var Order = require('../../model/order');
const jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// User Type
const userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      token: {type:GraphQLString},
      first_name: {
        type: GraphQLString
      },
      last_name: {
        type: GraphQLString
      },
      profile_image: {
        type: GraphQLString
      },
      about: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLString
      },
      city: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      type: {
        type: GraphQLString
      },
      company: {
        type: GraphQLString
      },
      school: {
        type: GraphQLString
      },
      hometown: {
        type: GraphQLString
      },
      languages: {
        type: GraphQLString
      },
      gender: {
        type: GraphQLString
      },
    }
  }
});

// Property Type
const propertyType = new GraphQLObjectType({
  name: 'property',
  fields: function () {
    return {
      propid: {
        type: new GraphQLNonNull(GraphQLID)
      },
      location: {
        type: GraphQLString
      },
      proptype: {
        type: GraphQLString
      },
      headline: {
        type: GraphQLString
      },
      noOfRooms: {
        type: GraphQLInt
      },
      noOfBath: {
        type: GraphQLInt
      },
      allowedGuest: {
        type: GraphQLInt
      },
      email: {
        type: GraphQLString
      },
      image1: {
        type: GraphQLString
      },
      image2: {
        type: GraphQLString
      },
      image3: {
        type: GraphQLString
      },
      image4: {
        type: GraphQLString
      },
      price: {
        type: GraphQLInt
      },
      amenities: {
        type: GraphQLString
      },
      availFrom: {
        type: GraphQLString
      },
      availTo: {
        type: GraphQLString
      },
    }
  }
});

const bookingType = new GraphQLObjectType({
  name: 'booking',
  fields: function () {
    return {
      bookid: {
        type: new GraphQLNonNull(GraphQLID)
      },
      email: {
        type: GraphQLString
      },
      propid: {
        type: GraphQLInt
      },
      location: {
        type: GraphQLString
      },
      noOfRooms: {
        type: GraphQLInt
      },
      noOfBath: {
        type: GraphQLInt
      },
      allowedGuest: {
        type: GraphQLInt
      },
      proptype: {
        type: GraphQLString
      },
      image1: {
        type: GraphQLString
      },
      image2: {
        type: GraphQLString
      },
      image3: {
        type: GraphQLString
      },
      image4: {
        type: GraphQLString
      },
      price: {
        type: GraphQLInt
      },
      amenities: {
        type: GraphQLString
      },
      bookedFrom: {
        type: GraphQLString
      },
      bookedTo: {
        type: GraphQLString
      },
      headline:{
        type: GraphQLString
      },
      first_name:{
        type: GraphQLString
      },
      last_name:{
        type: GraphQLString
      },
      phone:{
        type: GraphQLInt
      },
      nights:{
        type: GraphQLInt
      }
    }
  }
});


// Query
const RootQuery = new GraphQLObjectType({
  name: 'userQuery',
  fields: {
      users: {
        type: new GraphQLList(userType),
        args:{
          email: {type:GraphQLString}
        },
         resolve: async function (parent,args) {
          const users = await User.find({email:args.email}).exec()
          if (!users) {
            throw new Error('Error')
          }
          console.log(users)
          return users
        }
      },
      property: {
        type: new GraphQLList(propertyType),
        args:{
          email: {type:GraphQLString}
        },
         resolve: async function (parent,args) {
          console.log("Inside Get Property in GraphQL")
          const properties = await Property.find({email:args.email}).exec()
          if (!properties) {
            throw new Error('Error')
          }
          console.log(properties);
          return properties
        }
      },
      searchProperty: {
        type: new GraphQLList(propertyType),
        args:{
          loc: {type:GraphQLString},
          availFrom:{type:GraphQLString},
          availTo: { type: GraphQLString },
          allowedGuest: { type: GraphQLInt },

        },
         resolve: async function (parent,args) {
          console.log("Inside Get Property in GraphQL")
          const properties = await Property.find({location:args.loc,allowedGuest:args.allowedGuest}).exec()
          if (!properties) {
            throw new Error('Error')
          }
          console.log(properties);
          return properties
        }
      },
      propertyByID: {
        type: new GraphQLList(propertyType),
        args:{
          propid: {type:GraphQLInt}
        },
         resolve: async function (parent,args) {
          console.log("Inside Get Property ID in GraphQL")
          const properties = await Property.find({propid:args.propid}).exec()
          if (!properties) {
            throw new Error('Error')
          }
          console.log(properties);
          return properties
        }
      },
      bookings: {
        type: new GraphQLList(bookingType),
        args:{
          email: {type:GraphQLString}
        },
         resolve: async function (parent,args) {
          console.log("Inside Get Trips in GraphQL")
          console.log(args.email)
          const bookings = await Order.find({email:args.email}).exec()
          if (!bookings) {
            throw new Error('Error')
          }
          console.log(bookings);
          return bookings
        }
      },

    }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      signup: {
          type: userType,
          args: {
              email:{type:GraphQLString},
              password:{type:GraphQLString},
              first_name: { type: GraphQLString },
              last_name: { type: GraphQLString },
              type:{ type: GraphQLString }
          },
          async resolve(parent, args){
            try {
              console.log("Inside Sign up GraphQL");
              const userAlreadyExists = await User.findOne({email:args.email})
              console.log(userAlreadyExists)
              if(userAlreadyExists){
                return ({error:"User exists"})
              }
              const uModel = new User(args);
              const newUser = await uModel.save();
              console.log(newUser)
              if (!newUser) {
                return new Error('Error');
              }
              let token = await jwt.sign({ user : newUser },'homeaway');
              newUser.token = token;
              console.log(newUser)
              return newUser
          } catch(err) {
            return new FatalError("Email exists" );
          }
        }
      },
      login: {
        type: userType,
        args: {
            email:{type:GraphQLString},
            password:{type:GraphQLString},
            type:{ type: GraphQLString }
        },
        async resolve(parent, args){
          try {
            console.log("Inside Login GraphQL");
            const user = await User.findOne({email:args.email,type:args.type})
            if (!user) {
              return [{
                path:"email",
                message:"invalid login"
              }]
            }
            //const password = await bcrypt.hash(args.password,10);
            const validate = await bcrypt.compare(args.password,user.password);
            console.log(validate)
            if( !validate ){
              return  [{
                path:"password",
                message:'Wrong Password'
              }]
            }
            let token = await jwt.sign({ user : user},'homeaway');
            user.token = token;
            console.log(user)
            return user
        } catch(err) {
          return new FatalError("Invalid user",err );
        }
      }
    },
    logout: {
      type:userType,
      args:{
        email:{type:GraphQLString},
      },
    async resolve(parent, args){
      try {
        console.log("Inside Logout Route at server")
        return args.email;
      }
      catch(err){
        return new Error("Error in logout",err );
      }
  }
},
  postProfile: {
    type:userType,
    args:{
      email:{type:GraphQLString},
      first_name:{type:GraphQLString},
      last_name:{type:GraphQLString},
      about:{type:GraphQLString},
      phone:{type:GraphQLString},
      city:{type:GraphQLString},
      company:{type:GraphQLString},
      school:{type:GraphQLString},
      hometown:{type:GraphQLString},
      languages:{type:GraphQLString},
      gender:{type:GraphQLString},
    },
     async resolve(parent, args){
      try {
        console.log("Inside postprofile up GraphQL");
        const results = await User.findOneAndUpdate({email:args.email},{$set:{
          first_name:args.first_name,
          last_name:args.last_name,
          about:args.about,
          phone:args.phone,
          city:args.city,
          company:args.company,
          school:args.school,
          hometown:args.hometown,
          languages:args.languages,
          gender:args.gender}},{new: true})

          return results
        }
     catch(err) {
      return new FatalError("Fatal error" );
    }
    }
  },
  postOrder: {
    type:bookingType,
    args:{
      first_name:{type:GraphQLString},
      last_name:{type:GraphQLString},
      email:{type:GraphQLString}, 
      propid:{type:GraphQLInt},
      location:{type:GraphQLString},
      proptype:{type:GraphQLString},
      headline:{type:GraphQLString},
      noOfRooms:{type:GraphQLInt},
      noOfBath:{type:GraphQLInt},
      allowedGuest:{type:GraphQLInt},
      image1:{type:GraphQLString},
      image2:{type:GraphQLString},
      image3:{type:GraphQLString},
      image4:{type:GraphQLString},
      price:{type:GraphQLInt},
      amenities:{type:GraphQLString},
      phone:{type:GraphQLInt},
      bookedFrom:{type:GraphQLString},
      bookedTo:{type:GraphQLString},
      nights:{type:GraphQLString},
    },
     async resolve(parent, args){
      try {
        console.log("Inside Book Order GraphQL");
        const Book = new Order(args);
        const BookOrder = await Book.save();
        console.log(BookOrder)

          return BookOrder
        }
     catch(err) {
      return new FatalError("Fatal error" );
    }
    }
}}
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
