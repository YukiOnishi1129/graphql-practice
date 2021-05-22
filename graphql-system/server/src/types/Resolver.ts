/**
 * ResolverType
 * @package Types
 */

/* graphql */
import { User as UserGraphQLType } from "@GraphQL/generated";

/**
 * ResolverContextType
 */
export interface ResolverContextType {
  currentUser: UserGraphQLType;
}
