resource "aws_network_acl" "pub" {
  vpc_id = aws_vpc.prod-vpc.id

  egress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  ingress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  tags = {
    Name = "Eng67.Andrew.Public.NACL.Terraform"
  }
}



resource "aws_network_acl" "priv" {
  vpc_id = aws_vpc.prod-vpc.id


  ingress {
      protocol   = -1
      rule_no    = 100
      action     = "allow"

      cidr_block = "0.0.0.0/0"

      from_port  = 0
      to_port    = 0

    }

    egress {

      protocol   = -1
      rule_no    = 100
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 0
      to_port    = 0
    }



  tags = {
    Name = "Eng67.Andrew.Private.NACL.Terraform"
  }
}



## App security group

resource "aws_security_group" "allow_tls" {
  name        = "Eng67.Andrew.Public-SG"
  description = "Allow TLS inbound traffic"
  vpc_id      = "${aws_vpc.prod-vpc.id}"

  ingress {
    description = "TLS from VPC"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    # here we are allowing anyone to enter our app at port 80, thus the 'http'
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH from port 22"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    # here we are only allowing our own IP into port 22
    cidr_blocks = ["77.98.125.189/32"]
  }

# the -1 for protocol refers to
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Eng67.Andrew.Terraform.Webapp-SG"
  }
}