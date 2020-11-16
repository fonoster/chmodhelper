FROM fonoster/base
COPY . /scripts
RUN ./install.sh
USER fonos
