#SUJU16 
**THE multi-parameter route optimizer for self-driving buses**  
Chech it out at [suju.online](https://suju.online)  

Made at [Junction 2016](httpwww.hackjunction.com) by Team Suhina:   
  Matti Parkkila  
  Aleksi Jokela  
  Jere Vaara   
  Aleksi Tella  
  Henri Nurmi

##Inspiration
Our team members are hyped about Machine Learning and UX. We were intrigued by the Sohjoa virtual bus stops challenge. It allowed us to design a bus service we would love to use ourselves: a cheap but efficient alternative for the taxi/uber. We wanted to hack a bunch of state of the art tech together to show how a dynamic bus service could work.

##The problem
Event organizers have trouble getting their attendees to the event venue. Public transportation may not be enough and organizing custom transportation is expensive and time-consuming. The best practice for custom transportation so far is to organize a route from a pre-defined point X to the venue using a pre-defined schedule. The customers will still have to travel to point X before they can use the arranged transportation. They will have to schedule their day based on the transportation's schedule. If they don't want to deal with these problems they can choose to use their own car or get a taxi/UBER, which gets expensive really fast.  
  
Technically, this kind of problem is often referred to as the last mile problem. We wanted to tackle a variation of this: the first mile problem. Even with just some tens of passengers there are millions of possible routes between them, let alone when a third variable, time, is taken into account.

##The solution
Our project for Junction 2016 aims to solve the transportation problem by using [Sohjoa](http://sohjoa.fi/) to organize dynamic and cost controlled custom transportation. Our concept is a tool for event organizers and public transportation decision makers that allows them to design dynamic routing for the self-driving bus. If the surroundings of a location are pre-scanned the bus can plan and drive routes that are planned on-the-go.  Our tool makes the required optimizations to the route, chooses a smart way to transport people from their desired pick-up location and tells Sohjoa which route and schedule to follow during the transportation. 

##The use cases  
1) Event transportation    
Events organize group transportation to boost visitor counts. Doing this in a cost efficient way is what really matters. Unlike public transportation there is a more clear business model: people bring in money, so it is worth investing money to bring them to the event. Our routing algorithm allows prioritization by cost, which means that people can be transported on a price per visitor basis.   
2) The commuter's first mile  
Currently public transportation is organized around node points such as railway or metro stations. However, the last mile or so is often the most unconvinient for a commuter. Busses to less populated areas leave seldomly and can't stop at everyones home. Our service can create efficient routes that transport everyone from and to the general area of their home - adjusting dynamically to demand thus being able to take the shortest route to the destination.  

##The tech
The service is running on a node.js server, with React and Redux used for the web UI. Our algorithms are written in Python so we can leverage state of the art Machine Learning libraries.  
1) Data visualisation with leaflet  
  \- Intuitive and easy to use planning and visualisation tool for virtual bus stops  
2) Routing with EMBERS  
  \- Leveraging Embers route planning to get fast routes between virtual bus stops  
3) Clustering user data  
  \- Recursive DBSCAN machine learning algorithm to reduce the complexity of the spacetime data.  
4) Sjukstra routing  
  \- Customized Djikstra that takes into account cost-factors that are specific to electric buses  
5) Telegram (SujuBot) end user demo  
  \- Example of an end user UI. Helps envision how the service would look for an end user.  
   
##Accomplishments  
The project required long hours and took our very best effort. In the end, even though at times we had problems and didn't always feel like we were progressing, we were able to create a prototype of a service that helps better imagine what is possible and how shared transportation could work. 

##What's next
Our project is left open ended. It could be taken towards multiple of development directions, but only time will tell. We hope that during the judging phase we will get inspiring suggestions or feedback on our project.

