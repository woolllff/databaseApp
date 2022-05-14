FROM alpine 

ENV ANSIBLE_HOST_KEY_CHECKING=False

# RUN apt-get update
RUN apk add ansible gcc python3-dev 
RUN apk add libc-dev libffi-dev openssl-dev
RUN apk add python3 
RUN apk add py3-pip openssh-client 
RUN apk add sshpass
RUN pip3 install --upgrade paramiko
RUN pip3 install docker
# RUN apt-get update

COPY hosts /hosts

COPY ansible.cfg /etc/ansible/ansible.cfg

COPY entrypoint.sh /entrypoint.sh
COPY Playbook.yml /Playbook.yml

CMD ["sh", "/entrypoint.sh"]