import { gql } from 'graphql-request'
import { MeFragment } from '@/graphql/auth/me.fragment'

export const CreateUserMutation = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $locale: Locale!
    $role: Role!
    $profilePicture: Upload
    $country: String!
    $phoneNumber: Float!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      locale: $locale
      role: $role
      profilePicture: $profilePicture
      country: $country
      phoneNumber: $phoneNumber
    ) {
      ...MeFragment
    }
  }
  ${MeFragment}
`
