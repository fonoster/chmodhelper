# Chmod Helper

![publish to docker](https://github.com/fonoster/chmodhelper/workflows/publish%20to%20docker%20hub/badge.svg)

Watches for APP_CREATED events and changes the file mode for the entrypoint

## Available Versions

You can see all images available to pull from Docker Hub via the [Tags](https://hub.docker.com/repository/registry-1.docker.io/fonoster/chmodhelper/tags?page=1) page. Docker tag names that begin with a "change type" word such as task, bug, or feature are available for testing and may be removed at any time.

## Installation

You can clone this repository and manually build it.

```
cd certshelper
docker build -t fonoster/chmodhelper:%%VERSION%% .
```

Otherwise you can pull this image from docker index.

```
docker pull fonoster/chmodhelper:latest:%%VERSION%%
```

## Usage Example

The following is a minimal example of using this image.

```bash
docker run -it \
  -v $(pwd)/data:/data \
  fonoster/chmodhelper
```

## Volumes

- `/data` - Volume with shared data, including applications, recordings, and more.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/fonoster/fonos/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- [Pedro Sanders](https://github.com/psanders)

See also the list of contributors who [participated](https://github.com/fonoster/uploaderhelper/contributors) in this project.

## License

Copyright (C) 2020 by Fonoster Inc. MIT License (see [LICENSE](https://github.com/fonoster/fonos/blob/master/LICENSE) for details).
