import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {

  providers: [
    GoogleProvider ({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,      
    }),    
  ],
  secret:process.env.NEXTAUTH_SECRET,
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
