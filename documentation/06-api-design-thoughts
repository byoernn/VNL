#API Design Thougts

GraphQL

	• Benefits:

		○ allows fetching and delivering only the requested data

		○ detailed error descriptions for debugging purposes and autogenerates documentation on API changes

	• Trade-off

		○ breaks intermediate proxy caching, making caching implementations more difficult



Representational State Transfer - REST

	• Benefits:

		○ Mature architecture style

		○ stateless, cacheable, convention-based 

	• Trade-off:

		○ prone to both under-fetching and over-fetching



Remote Procedure Call - RPC/gRPC

	• Benefits:

		○ compact data format, fast message encoding and decoding, and the usage of HTTP/2

		○ built-in support for streaming

		○ interface contract enables the communication between services written in different programming languages

	• Trade-off

		○ data format is unreadable for humans



Probosal 1: extends RESTfull Design by actions like in RPC to get query capabilities like graphql.

Example:

Operations on multiple items:

Method	Url	Description

GET	/user/	GET all elements

POST	/user/	GET all elements with graphql like requests body

POST	/user/create	CReate a list of elements

PUT/PATCH	/user/update	Update a list of elements

DELETE	/user/delete	Delete a list of elements

*	/user/{action}	Any Action on a list of elements



Operation in single Item:

Method	Url	Description

GET	/user/{id}/	GET an element

POST	/user/{id}/	GET an element with graphql like requests body

POST	/user/{id}/create	Creates an element

	

PUT/PATCH	/user/{id}/update	Update an element

DELETE 	/user/{id}/delete	Delete an element

*	/user/{id}/{action}	Any Action on an element



This way requesting Data may be as powerful as graphql and as well designed as REST.

Actions are transparent to Developers.



Trade-off is that there is no ready to use Framework and it will take some time to implement your API, but the Benefit is that there is no Framework, because it is more of a architectural concept.

So it can be used according to whatever needs you have. 

For example you create and update elements in a single requests, then you can invent a "save" Action to do so. Or, for odata like batches, invent a "batch" Action.



Proposal 2: use OpenAPI and OpenAPI-generator for Documentation and Interface Contract.
Also Contract First Development is possible.


Proposal 3: 

Enforce Security by following OWASP Security settings for your API. Not by a Framework like gRPC.



Proposal 4:

If more speed is needed then transfer Data in binary format with something like msgpack, protobuf or simply gZip. 

Be aware this may reduces compatability with OpenAPI contracts.



Proposal 5: 

Batch Action, similar to odatas batch, executes consecutive requests into one response, even If they depend on each other.

Example:

```json

{

    currentUser: {

        method: 'get',

        url:'/user/123'

    },

    wishlist: {

        after:['currentUser'],

        method: 'post',

        url:'/list/$.currentUser.listId/',

        body:'{ id, name, items:{ id, name, price, amount } }'

    },

    ...

}

```

The 'after' Attribute describes witch in order requests have to Finish.

The "$" sign, represents the state containing all the results at that given time.

This way a complete Graph of Data can be loaded even if requests depend on each other.



Proposal 6 - Paging:

Provide 'page' Action

Method	Url	Description

GET/POST	/user/page	Param: pageSize: number

		GET total number of pages,

		Post supports query body

GET/POST	/user/page/{id)	Param: pageSize: number

		GET a list of elemts by page,

		Post supports query body



Probosal 7:

Params for list operations in query body or queryparams.

These may also work in properties which are collections.



$sort: [field,'asc'|'desc']

$where: WhereFilter



WhereFilter:

{ not:{ ... } }

{ and:[ ... ] }

{ or:[ ... ] }

{ [operation]: [field,value] }

WhereOperations:

equals, contains, ...

Example: /user/
```
{
    id,
    username,
    $where : {
        contains: ['username','dev']
    },
    $sort: ['username','asc'],
    roles {
        id,
        name,
        $sort: ['name','asc']
    }
}
```
