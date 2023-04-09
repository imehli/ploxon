# Project stats

> ## Success story

1. ✅ Receives a **GET** request on the route **/api/projects/{project_id}/results**
2. ✅ Validates if the request was made by a **user**
3. ✅ Returns **200** with projectresult data

> ## Exceptions

1. ✅ Returns **404** error if API does not exist
2. ✅ Returns **403** error if not a user
3. ✅ Returns error **500** if there is an error when trying to list the project stats