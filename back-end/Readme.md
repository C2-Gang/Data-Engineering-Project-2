Authors: Chloé CARAYON - Cécile SPATZ  
Date: 6th March 2022
---

# Data-Engineering-Project-2

## Back-end

### Containarization

- build docker
```
docker build -t data-engineering-project-2-back-end
```

- run docker image
```
docker run -p 5000:5000 image-id
 ```

### General

- run application
```
poetry run python app/app.py
```

- execute test
```
poetry run python -m unittest
```

