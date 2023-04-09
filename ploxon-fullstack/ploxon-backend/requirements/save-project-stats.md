# Project

> ## Success story

1. ✅ Receives a **PUT** request on the route **/api/projects/{project_id}/results**
2. ✅ Validates if the request was made by a **user**
3. ✅ Validates the parameter **project_id**
4. ✅ Validates if the **resources** field is a valid resources
5. ✅ **Create** a project stats with the data provided if you don't have a record
6. ✅ **Updates** a project stats with the data provided if you already have a record
7. ✅ Returns **200** with project stats data

> ## Exceptions

1. ✅ Returns **404** error if API does not exist
2. ✅ Returns **403** error if not a user
3. ✅ Returns **403** error if the project_id passed in the URL is invalid
4. ✅ Returns **403** error if the response sent by the client is an invalid response
5. ✅ Returns error **500** if there is an error when trying to create the project stats
6. ✅ Returns error **500** if there is an error when trying to update the project stats
7. ✅ Returns error **500** if there is an error when trying to load the project