> ## Success story

1. ✅ Receives a **POST** type request on the **/api/login** route
2. ✅ Validate mandatory data **email** and **password**
3. ✅ Validate that the **email** field is a valid email
4. ✅ **Search** the user with the provided email and password
5. ✅ Generates an access **token** from the user ID
6. ✅ **Updates** user data with generated access token
7. ✅ Returns **200** with access token and username

> ## Exceptions

1. ✅ Returns **404** error if API does not exist
2. ✅ Returns **400** error if email or password are not provided by the client
3. ✅ Returns error **400** if the email field is an invalid email
4. ✅ Returns **401** error if it does not find a user with the provided data
5. ✅ Returns error **500** if there is an error when trying to generate the access token
6. ✅ Returns error **500** if there is an error when trying to update the user with the generated access token