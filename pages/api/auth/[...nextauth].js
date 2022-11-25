import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {

  providers: [
    GoogleProvider ({
      // clientId: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId:"153398833382-ceq3ih8jqf1p1nmu89ongahc6e292b95.apps.googleusercontent.com",
      clientSecret:"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",
    }),
  ],
  
  pages:{
    signIn: '/auth/signin'
  },

  // This will add extra things in session coming from google
  callbacks: {
    async session({session, token }){
      session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    }
  }

}
export default NextAuth(authOptions)
