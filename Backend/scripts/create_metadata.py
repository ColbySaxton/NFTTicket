import os
import requests
import json
from brownie import SectionOne, SectionTwo, SectionThree, network
from metadata import sample_metadata, current_metadata
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

def create_metadata_section_one():
    print("Working on " + network.show_active())
    section_one = SectionOne[-1]
    number_of_section_one_tickets = section_one.count()
    print(
        "The number of tokens you've deployed is: "
        + str(number_of_section_one_tickets)
    )
    sample_metadata_section_one(number_of_section_one_tickets, section_one)

def sample_metadata_section_one(number_of_tickets, nft_contract):
    for token_id in range(number_of_tickets):
        collectible_metadata = current_metadata.metadata_template
        metadata_file_name = (
            "./metadata/{}/".format(network.show_active())
            + str(token_id)
            + ".json"
        )
        if Path(metadata_file_name).exists():
            print(
                "{} already found, delete it to overwrite!".format(
                    metadata_file_name)
            )
        else:
            print("Creating Metadata file: " + metadata_file_name)
            image_to_upload = None
            if os.getenv("UPLOAD_IPFS") == "true":
                image_path = "./img/section_one_ticket.gif"
                image_to_upload = upload_to_ipfs(image_path)
            collectible_metadata["Image"] = image_to_upload
            with open(metadata_file_name, "w") as file:
                json.dump(collectible_metadata, file)
            if os.getenv("UPLOAD_IPFS") == "true":
                upload_to_ipfs(metadata_file_name)

def write_metadata_section_one(number_of_tickets, nft_contract):
    sections = []
    for section in range(1, 21):
        sections.append(section)
    rows = [1, 2, 3, 4, 5]
    seats = []
    for seat in range(1, 20):
        seats.append(seat)
    for token_id in range(number_of_tickets):
        collectible_metadata = sample_metadata.metadata_template
        metadata_file_name = (
            "./metadata/{}/".format(network.show_active())
            + str(token_id)
            + ".json"
        )
        if Path(metadata_file_name).exists():
            print(
                "{} already found, delete it to overwrite!".format(
                    metadata_file_name)
            )
        else:
            print("Creating Metadata file: " + metadata_file_name)
            collectible_metadata["Section"] = sections[token_id % 20]
            collectible_metadata["Row"] = rows[token_id % 5]
            collectible_metadata["Seat"] = seats[token_id % 19]
            collectible_metadata["Highlight Number"] = token_id % 5
            image_to_upload = None
            if os.getenv("UPLOAD_IPFS") == "true":
                image_path = "./img/section_one_ticket.gif"
                image_to_upload = upload_to_ipfs(image_path)
            collectible_metadata["image"] = image_to_upload
            with open(metadata_file_name, "w") as file:
                json.dump(collectible_metadata, file)
            if os.getenv("UPLOAD_IPFS") == "true":
                upload_to_ipfs(metadata_file_name)

def create_metadata_section_two():
    print("Working on " + network.show_active())
    section_two = SectionTwo[-1]
    number_of_section_two_tickets = section_two.count()
    print(
        "The number of tokens you've deployed is: "
        + str(number_of_section_two_tickets)
    )
    write_metadata_section_two(number_of_section_two_tickets, section_two)


def write_metadata_section_two(number_of_tickets, nft_contract):
    sections = []
    for section in range(1, 21):
        sections.append(section)
    rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    seats = []
    for seat in range(1, 26):
        seats.append(seat)
    for token_id in range(number_of_tickets):
        collectible_metadata = sample_metadata.metadata_template
        metadata_file_name = (
            "./metadata/{}/".format(network.show_active())
            + str(token_id)
            + ".json"
        )
        if Path(metadata_file_name).exists():
            print(
                "{} already found, delete it to overwrite!".format(
                    metadata_file_name)
            )
        else:
            print("Creating Metadata file: " + metadata_file_name)
            collectible_metadata["Section"] = sections[token_id % 20]
            collectible_metadata["Row"] = rows[token_id % 5]
            collectible_metadata["Seat"] = seats[token_id % 19]
            collectible_metadata["Highlight Number"] = token_id % 5
            image_to_upload = None
            if os.getenv("UPLOAD_IPFS") == "true":
                image_path = "./img/section_one_ticket.gif"
                image_to_upload = upload_to_ipfs(image_path)
            collectible_metadata["image"] = image_to_upload
            with open(metadata_file_name, "w") as file:
                json.dump(collectible_metadata, file)
            if os.getenv("UPLOAD_IPFS") == "true":
                upload_to_ipfs(metadata_file_name)

def create_metadata_section_three():
    print("Working on " + network.show_active())
    section_three = SectionThree[-1]
    number_of_section_three_tickets = section_three.count()
    print(
        "The number of tokens you've deployed is: "
        + str(number_of_section_three_tickets)
    )
    write_metadata_section_one(number_of_section_three_tickets, section_three)


def write_metadata_section_three(number_of_tickets, nft_contract):
    sections = []
    for section in range(1, 26):
        sections.append(section)
    rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    seats = []
    for seat in range(1, 21):
        seats.append(seat)
    for token_id in range(number_of_tickets):
        collectible_metadata = sample_metadata.metadata_template
        metadata_file_name = (
            "./metadata/{}/".format(network.show_active())
            + str(token_id)
            + ".json"
        )
        if Path(metadata_file_name).exists():
            print(
                "{} already found, delete it to overwrite!".format(
                    metadata_file_name)
            )
        else:
            print("Creating Metadata file: " + metadata_file_name)
            collectible_metadata["Section"] = sections[token_id % 20]
            collectible_metadata["Row"] = rows[token_id % 5]
            collectible_metadata["Seat"] = seats[token_id % 19]
            collectible_metadata["Highlight Number"] = token_id % 5
            image_to_upload = None
            if os.getenv("UPLOAD_IPFS") == "true":
                image_path = "./img/csection_one_ticket.gif"
                image_to_upload = upload_to_ipfs(image_path)
            collectible_metadata["image"] = image_to_upload
            with open(metadata_file_name, "w") as file:
                json.dump(collectible_metadata, file)
            if os.getenv("UPLOAD_IPFS") == "true":
                upload_to_ipfs(metadata_file_name)

# curl -X POST -F file=@metadata/rinkeby/0-SHIBA_INU.json http://localhost:5001/api/v0/add


def upload_to_ipfs(filepath):
    with Path(filepath).open("rb") as fp:
        image_binary = fp.read()
        ipfs_url = (
            os.getenv("IPFS_URL")
            if os.getenv("IPFS_URL")
            else "http://localhost:5001"
        )
        response = requests.post(ipfs_url + "/api/v0/add",
                                 files={"file": image_binary})
        ipfs_hash = response.json()["Hash"]
        filename = filepath.split("/")[-1:][0]
        image_uri = "ipfs://{}?filename={}".format(
            ipfs_hash, filename)
        print(image_uri)
    return image_uri

def main():
    create_metadata_section_one()