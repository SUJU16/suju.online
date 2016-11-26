#SUJU16 
  
**THE multi-parameter route optimizer for self-driving buses**

Made at [Junction 2016](httpwww.hackjunction.com) by Team Suhina:   
  Matti Parkkila  
  Aleksi Jokela  
  Jere Vaara   
  Aleksi Tella  
  Henri Nurmi

##The problem
Event organizers have trouble getting their attendees to the event venue. Public transportation may not be enough and organizing custom transportation is expensive and time-consuming. The best practice for custom transportation so far is to organize a route from a pre-defined point X to the venue using a pre-defined schedule.

The customers will still have to travel to point X before they can use the arranged transportation. They will have to schedule their day based on the transportation's schedule. If they don't want to deal with these problems they can choose to use their own car or get a taxi/UBER, which gets expensive really fast.

##The solution
Our project for Junction 2016 aims to solve the problem by using [Sohjoa](http://sohjoa.fi/) to organize the custom transportation. Our concept is a tool for event-organizers that allows them to design the parameters that the Sohjoa bus should try to optimize while deciding its route dynamically. Our tool makes the required optimizations to the route, chooses a smart way to transport people from their desired pick-up location and tells Sohjoa which route and schedule to follow during the transportation.

##The use cases  
1) Event transportation    
Events organize group transportation to boost visitor counts. Opposite to public transportation there is a more clear business model: people bring in money, so it is worth investing money to bring them to the event. Our routing algorithm allows cost structure calculations, which means that people can be transported on a price per visitor basis.   
2) The commuter's first mile  
Currently public transportation is organized around certain node points, such as Kamppi or Westend. During busy commuting times these locations have busses passing by every few minutes. However, the last mile or so is the most unconvinient for the commuter. Busses to less populated areas go seldomly and can't stop at everyones home. Our service can create efficient routes that transport everyone to the general area of their home - adjusting dynamically to demand. This allows taking the shortest route to the destination.  

##The tech
1) Clustering user data  
2) Sjukstra the clusters  
3) Routing with EMBERS  
4) Data visualisation with leaflet  
