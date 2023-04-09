# Create project

> ## Success story

1. ✅ Receives a **POST** request on the route **/api/projects**
2. ✅ Validates if the request was made by an **admin**
3. ✅ Validate mandatory data **description** and **resourcess**
4. ✅ **Create** a projectwith the data provided
5. ✅ Returns **204**, no data

> ## Exceptions

1. ✅ Returns **404** error if API does not exist
2. ✅ Returns **403** error if user is not admin
3. ✅ Returns **400** error if description or resources are not provided by the client
4. ✅ Returns error **500** if there is an error when trying to create the project