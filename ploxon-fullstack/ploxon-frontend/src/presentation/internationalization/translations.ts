/* eslint-disable @typescript-eslint/quotes */
export const translations =
{
  fr: {
    translations: {
      ploxonHome: {
        navigation: {
          signin: `Se connecter`,
          signup: `S'enregistrer`,
          graphql: `Interroger le backend en GraphQL`
        },
        ploxonDescription: {
          presentation: {
            title: `BIENVENUE DANS PLOXON`,
            div1: `Ploxon est une plateforme d'eléction et de gestion de projets autogérée grace à un model DAO (Organisation Autonome Décentralisée), 
                          elle est conçue avec des principes de la Clean architecture garantissant une conception modulaire scalable et maintenable. 
                          La plateforme est deployée dans le cloud sous le model 3 tier VPC architecture dans AWS fournissant une infrastructure securisée et robuste, 
                          étant donné l'importance de ces concepts pour le développement de ce projet, nous allons les expliquer ci-après.`
          },
          tdd: {
            title: `TDD`,
            div1: `Le Test Driven Development (TDD) est une méthode de développement logiciel dans laquelle les tests sont écrits avant le code. 
                          Le TDD est souvent utilisé dans les méthodologies Agile et favorise le développement incrémental et itératif.`,
            div2: `Pourriez-vous vous rendre aujourd'hui pour la première fois à une destination sans utiliser de GPS ? C'est possible, 
                          mais c'est très difficile. Le TDD peut être considéré comme un GPS : vous définissez une destination (un objectif), 
                          le GPS vous guide pour vous y rendre et lorsque vous vous éloignez de l'itinéraire (échec du test), 
                          le GPS vous avertit pour vous aider à rejoindre l'itinéraire.`,
            div3: `Les étapes du TDD :`,
            div4: `1. Écrire un test : Le développeur commence par écrire un test qui vérifie le comportement attendu de la fonction ou du module qu'il souhaite développer.`,
            div5: `2. Exécuter le test : Le développeur exécute le test et vérifie qu'il échoue, ce qui indique que la fonctionnalité n'est pas encore implémentée.`,
            div6: `3. Écrire le code : Le développeur écrit le code qui permet de passer le test.`,
            div7: `4. Exécuter à nouveau le test : Le développeur exécute à nouveau le test et vérifie qu'il passe avec succès.`,
            div8: `5. Refactoriser le code : Le développeur améliore le code en supprimant les doublons, en améliorant la lisibilité, etc.`,
            div9: `6. Répéter les étapes 1 à 5 : Le développeur répète ces étapes jusqu'à ce que toutes les fonctionnalités soient implémentées.`,
            div10: `Ainsi en suivant les principes du TDD vous vous octroyez une liberté importante quand vous codez puisque vous avez le droit de vous tromper et 
                            essayer des nouvelles idées sans cette crainte permanente de vous planter, cela vous aide également à améliorer le design de votre code et même 
                            oser utiliser les designs pattern !`
          },
          cleanArchitecture: {
            title: `CLEAN ARCHITECTURE`,
            div1: `La Clean Architecture est une approche de développement de logiciels qui met l'accent sur la séparation des préoccupations et 
                          la maintenabilité. Elle préconise une architecture en couches où chaque couche est séparée par des frontières claires et interagit avec 
                          la couche supérieure et inférieure via des interfaces bien définies. La couche la plus extérieure est généralement la couche d'interface utilisateur, 
                          suivie d'une couche d'application, d'une couche de domaine et d'une couche de données au niveau le plus interne. L'objectif est de maintenir chaque 
                          couche indépendante des autres, ce qui facilite la modification ou le remplacement d'une couche sans affecter les autres. 
                          La Clean Architecture favorise la testabilité, la modularité et la flexibilité dans le développement de logiciels.`,
            div2: `Le projet Ploxon est développé selon les principes de la Clean Architecture, où les couches MAIN et INFRA contiennent les détails d'implémentation 
                          des différents systèmes (interfaces) définis dans les couches PRESENTATION et DATA. Le principe d'inversion de dépendances assure un découplage des 
                          modules logiciels, correspondant au "D" de l'acronyme SOLID. En appliquant ce principe, la relation de dépendance conventionnelle des modules de 
                          haut niveau par rapport aux modules de bas niveau est inversée pour rendre les premiers indépendants des seconds.`,
            div3: `La dépendance des éléments est facilement remarquable au niveau de la partie supérieure de chaque fichier, 
                          elle est définie par la ligne "import ... from ...".`,
            div4: `Dans le monde du développement, nous pourrions assimiler le travail d'un développeur au fait d'élaborer les liens appropriés entre 
                          différents systèmes, ce que l'on peut comparer à un électricien qui installe un réseau électrique. Imaginez si le technicien crée 
                          des jonctions comme sur l'image ci-dessus pour lier les câbles électriques, cela pourrait fonctionner au début, 
                          mais au fur et à mesure que le système gagne en complexité, ce type de jonction devient un enfer. Au lieu de cette façon de 
                          faire, il est préférable de contrôler les liens entre les systèmes en créant des ports (prises de courant), des 
                          adaptateurs (prises mâles), et le jour où l'on veut effectuer des changements, il suffit simplement de débrancher la prise et 
                          de la remplacer ou de la supprimer !`,
            div5: `À l'instar des prises de courant électriques, dans le monde du code, un socle de prise est assimilable à un port (interface), 
                            la prise mâle à un adaptateur et le système électrique qui traite le courant branché au use case. Ainsi, un très bon niveau de 
                            séparation des préoccupations est garanti grâce à ce processus.`
          },
          infrastructure: {
            title: `PLOXON INFRASTRUCTURE`,
            div1: `Le projet Ploxon est deployé dans le cloud d'AWS selon une architecture 3 tier VPC, ce modèle utilise trois couches distinctes pour 
                            la mise en place d'une infrastructure dans le cloud. La première couche est la couche présentation, qui est responsable de 
                            l'interface utilisateur et de la présentation des données. La deuxième couche est la couche logique, qui gère la logique de 
                            l'application et traite les requêtes utilisateur. Enfin, la troisième couche est la couche de données, qui stocke les données de l'application.`,
            div2: `La couche VPC est une couche supplémentaire qui permet de mettre en place un réseau privé virtuel dans le cloud d'AWS, ce qui 
                            permet de sécuriser l'infrastructure et de limiter l'accès aux ressources du cloud.`,
            div3: `En utilisant une architecture en 3 tier VPC, il est possible de garantir un bon niveau de disponibilité et de scalabilité pour 
                            une application déployée dans le cloud d'AWS, en séparant les différentes couches de l'infrastructure et en les gérant indépendamment les 
                            unes des autres.`,
            div4: `Pour l'instant, la base de données disponible est externalisée. Le système est implémenté dans le projet, mais les ressources sont 
                            hébergées dans le cloud privé de MongoDB. Nous envisageons d'implémenter un système et des ressources SQL en interne.`,
            div5: ``,
            div6: ``
          },
          dao: {
            title: `DAO`,
            div1: `Ploxon est conçu pour être gouvernée par un modèle d'organisation décentralisée et autonome (DAO). 
                          Actuellement, le système DAO n'est pas encore implémenté et Ploxon est en phase de test bêta avec des améliorations en cours.`,
            div2: `Les développeurs sont invités à contribuer au projet et à façonner son avenir. 
                          Vous pouvez trouver le code source de Ploxon et suivre son développement sur notre <LINK_GITHUP>dépôt Github</LINK_GITHUP>. 
                          Rejoignez la communauté Ploxon et soyez un acteur du futur des systèmes décentralisés.`
          },
          desclaimer: {
            title: `NB`,
            div1: `Ploxon est un produit en bêta et est toujours en cours de développement. Bien que nous nous efforcions de fournir une plateforme fiable et fonctionnelle, 
                          il peut y avoir des bugs et d'autres problèmes qui affectent les performances. 
                          En utilisant Ploxon, vous comprenez et reconnaissez que vous utilisez le service à vos propres risques. 
                          Ploxon et ses créateurs ne sont pas responsables de toutes les pertes ou dommages qui peuvent survenir en résultat de l'utilisation de la plateforme. 
                          Nous accueillons les contributions et les commentaires de la communauté pour nous aider à continuer à améliorer Ploxon.`,
            div2: `Ce disclaimer met en évidence la nature bêta du produit, tout en indiquant clairement qu'il n'est pas encore entièrement testé ou infaillible. 
                          Il établit l'attente que l'utilisateur utilise Ploxon à ses propres risques, et protège les développeurs de toutes les répercussions légales potentielles.`
          }
        }
      },
      login: {
        header: `SE CONNECTER`,
        input1: `Saisir votre mail`,
        input2: `Saisir votre mot de passe`,
        submit1: `SOUMETTRE`,
        link1: `créer un compte`
      }
    }
  },
  en: {
    translations: {
      ploxonHome: {
        navigation: {
          signin: `Sign in`,
          signup: `Sign up`,
          graphql: `GraphQL the backend`
        },
        ploxonDescription: {
          presentation: {
            title: `WELCOME TO PLOXON`,
            div1: `Ploxon is a platform for self-managed elections and project management that operates using a decentralized autonomous organization (DAO) model, 
                          it is designed with clean architecture principles ensuring modular scalable and maintainable design. 
                          The platform is deployed in the cloud using AWS 3 tier VPC architecture providing a secure and robust infrastructure, 
                          given the importance of these concepts for the development of this project, we will explain them below.`
          },
          tdd: {
            title: `TDD`,
            div1: `Test Driven Development (TDD) is a software development method in which tests are written before the code. 
                          TDD is often used in Agile methodologies and promotes incremental and iterative development.`,
            div2: `Could you travel to a destination today without using GPS for the first time? While it is possible, it can be very challenging.
                          Test Driven Development (TDD) can be likened to a GPS: you establish a destination (a target), and GPS guides you towards achieving it. 
                          If you deviate from the intended path (a failed test), GPS alerts you and helps you return to the right path.`,
            div3: `TDD steps :`,
            div4: `1. Write a test: The developer starts by writing a test that verifies the expected behavior of the function or module they want to develop.`,
            div5: `2. Run the test: The developer runs the test and verifies that it fails, indicating that the functionality is not yet implemented.`,
            div6: `3. Write the code: The developer writes the code that allows the test to pass.`,
            div7: `4. Run the test again: The developer runs the test again and verifies that it passes successfully.`,
            div8: `5. Refactor the code: The developer improves the code by removing duplicates, improving readability, etc.`,
            div9: `6. Repeat steps 1 to 5: The developer repeats these steps until all the functionality is implemented.`,
            div10: `So by following the principles of TDD, you grant yourself significant freedom when coding, 
                            as you have the ability to make mistakes and try out new ideas without the constant fear of failure. 
                            This approach also helps you improve the design of your code and encourages you to use even the most intimidating design patterns.`
          },
          cleanArchitecture: {
            title: `CLEAN ARCHITECTURE`,
            div1: `Clean Architecture is a software development approach that emphasizes separation of concerns and maintainability. 
                          It advocates for a layered architecture where each layer is separated by clear boundaries and interacts with the layer above and 
                          below it through well-defined interfaces. The outermost layer is typically the user interface layer, 
                          followed by an application layer, a domain layer, and a data layer at the innermost level. 
                          The goal is to keep each layer independent of the others, making it easier to modify or replace a layer without affecting the others. 
                          Clean Architecture promotes testability, modularity, and flexibility in software development.`,
            div2: `Ploxon project is developed following the principles of Clean Architecture, 
                          where the MAIN and INFRA layers contain the implementation details of the different systems (interfaces) 
                          defined in the PRESENTATION and DATA layers. The principle of dependency inversion ensures a decoupling of 
                          software modules, corresponding to the "D" of the SOLID acronym. By applying this principle, 
                          the conventional dependency relationship between high-level and low-level modules is inverted to 
                          make the former independent of the latter.`,
            div3: `The dependency of elements is easily noticeable at the top of each file, defined by the line "import ... from ...".`,
            div4: `In the world of development, we could compare a developer's job to elaborating the appropriate links between different systems, 
                          which can be compared to an electrician installing an electrical network. Imagine if the technician creates junctions like in the 
                          image above to link the electrical cables, it could work at first, but as the system becomes more complex, 
                          this type of junction becomes a nightmare. Instead of doing it this way, it's better to control the links between systems by 
                          creating ports (outlets), adapters (male plugs), and when the time comes to make changes, simply unplug the outlet and replace or 
                          remove it!`,
            div5: `Like electrical power sockets, in the world of code, a socket is comparable to a port (interface), a male plug to an adapter, 
                            and the electrical system that processes the current connected to the use case. Thus, a very good level of separation of concerns is 
                            ensured through this process.`
          },
          infrastructure: {
            title: `PLOXON INFRASTRUCTURE`,
            div1: `Ploxon is deployed in the AWS cloud using a 3-tier VPC architecture. This model uses three distinct layers to set up an 
                            infrastructure in the cloud. The first layer is the presentation layer, which is responsible for the user interface and data presentation. 
                            The second layer is the logic layer, which manages the application logic and processes user requests. Finally, the third layer is 
                            the data layer, which stores the application data.`,
            div2: `The VPC layer is an additional layer that allows for the setup of a virtual private network in the AWS cloud, which helps to 
                            secure the infrastructure and limit access to cloud resources.`,
            div3: `By using a 3-tier VPC architecture, it is possible to ensure a good level of availability and scalability for an application deployed in 
                            the AWS cloud, by separating the different layers of the infrastructure and managing them independently of each other.`,
            div4: `Currently, the available database is outsourced. The system is implemented in the project, but the resources are hosted in 
                            MongoDB's private cloud. We plan to implement an in-house SQL system and resources.`,
            div5: ``,
            div6: ``
          },
          dao: {
            title: `DAO`,
            div1: `Ploxon is designed to be governed by a DAO model. Currently, the DAO system is not yet implemented, and Ploxon is in a beta testing phase with ongoing improvements. 
                          Developers are invited to contribute to the project and help shape its future.`,
            div2: `You can find Ploxon's source code and follow its development on our <LINK_GITHUP>Github repository</LINK_GITHUP>. 
                          Join the Ploxon community and be a part of shaping the future of decentralized systems.`
          },
          desclaimer: {
            title: `NB`,
            div1: `Ploxon is a beta product and still in the process of development. While we strive to provide a reliable and functional platform, 
                          there may be bugs and other issues that impact performance. By using Ploxon, you understand and acknowledge that you use the service at your own risk. 
                          Ploxon and its creators are not responsible for any losses or damages that may occur as a result of using the platform. 
                          We welcome contributions and feedback from the community to help us continue improving Ploxon.`,
            div2: `This disclaimer highlights the beta nature of the product, while also making clear that it is not yet fully tested or foolproof. 
                          It sets the expectation that the user is using Ploxon at their own risk, and protects the developers from any potential legal repercussions.`
          }
        }
      },
      login: {
        header: `LOGIN`,
        input1: `Type your email`,
        input2: `Type your password`,
        submit1: `SUBMIT`,
        link1: `create an account`
      }
    }
  }
}
