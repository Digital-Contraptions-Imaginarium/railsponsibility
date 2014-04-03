Railsponsibility
================

##Introduction

Most UK train users are unaware of their rights, e.g. to compensation after cancellations or delays. This was raised as an issues by the [Office for Rail Regulation](http://orr.gov.uk) in its ["Rail passenger compensation and refund rights" report](http://orr.gov.uk/publications/reports/rail-passenger-compensation-and-refund-rights), published on 20/2/2014.

Athough the situation is improving and [the amount of money paid out in compensation rose by £3m](http://www.bbc.co.uk/news/business-26275394) during last surveyed year, more can be done to make Network Rail and the rail operating companies accountable for the disservice they are responsible of. 

As much as we accept that not all incidents can be avoided, we believe that the huge amount of compensations that passengers are **not** claiming is allowing Network Rail and the operating companies to sleep over the problem, minimising intervention while keeping patting each others' backs and [awarding their directors 6-digit bonuses](http://www.bbc.co.uk/news/business-23367781).

[Some are fighting this using policy](http://www.thetimes.co.uk/tto/business/industries/transport/article3986840.ece). We believe there is one more channel we can use, that is supporting passengers to do what is in their rights and claim compensation down to the last penny.

##About *Railsponsibility*

The *Railsponsibility* project is aimed at building a system to monitor all train services being cancelled or delayed that match the criteria for compensation, to then remind the passengers who were affected of the disservice they were affected by and support them in filing the claim, automating as much as possible the process.

##International Open Data Day 2014

![Team photo by @raimondiand](images/raimondiand_photo.jpg)

The first brainstorming and prototyping work was developed for the London Open Data Dat 2014 hackfest. You can read the [team's original notes](https://docs.google.com/document/d/1frKRTsy6c4qe-JpwDcY0vNHjUoS9ebc_eZT5LfzJDmM/edit?usp=sharing) and [view the outcome](International-Open-Data-Day-2014/).

Among the contributors were:

- Andy Lulham ([andylolz](https://github.com/andylolz))
- Gianfranco Cecconi ([giacecco](https://github.com/giacecco))
- Matias Piipari ([mz2](https://github.com/mz2))
- Thomas Down ([dasmoth](https://github.com/dasmoth))

... and others who did not leave their contacts! :-( In the picture are, from left to right, giacecco, andylolz, mz2 and, standing, dasmoth. Sorry we don't have a better one.

##Joint Open Data Hackathon

![Team photo](images/joint_open_data_hackathon.jpg)

Railsponsibility went on to win the [UK Cabinet Office](https://www.gov.uk/government/organisations/cabinet-office), [Stride](http://www.stride-project.com/) and [Network Rail](http://www.networkrail.co.uk/)'s "Joint Open Data hackathon" on 18 March 2014, as the best smart transport applications using data available from the sponsors' open data sources.

##Today

The project awoke again on 31/3/14 for additional development by Giacecco focusing exclusively on gathering train arrival data (not only delayed trains). The software has been re-written from the ground-up to be production- rather than hackathon-quality. He also migrated from Stride to [Transport API](http://transportapi.com/), as there is no reason to add one more point of failure in the already long chain between the source data and the software. You should be able to find some sample data in the [data](data/) folder. 

Note that although the scripts allow to capture all trains arrival data at any station, what we actually capture is only those stations where trains that are declared as delayed by some 'triggering event' stop, e.g. one passenger tweeting to @railspon something like "@railspon from berkhamsted to euston 1846" will capture all arrivals from any origin in Berkhamsted, Hemel Hempstead, Watford Junction and London Euston until the 18:46 train has arrived in London Euston. 

##Licence

The *RailReferences.csv* file is part of the "National Public Transport Access Nodes (NaPTAN)" dataset and is published under [OGL](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/2/) at [http://data.gov.uk/dataset/naptan](http://data.gov.uk/dataset/naptan). It was last downloaded on 2 April 2014.

![Creative Commons License](http://i.creativecommons.org/l/by/4.0/88x31.png "Creative Commons License") This work and all the data collected in the context of *Railsponsibility* is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/). By contributing software or data to the project you are subscribing to the terms of this licence.

The team picture at the International Open Data Day was taken by [@raimondiand](https://twitter.com/raimondiand/status/437232231367843840), the one at the Joint Open Data Hackathon was taken by [@eehcnas](https://twitter.com/eehcnas/status/445972723614117888). Both were enhanced a little by giacecco. 