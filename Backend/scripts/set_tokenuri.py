#!/usr/bin/python3
from brownie import SectionOne, SectionTwo, SectionThree, accounts, network, config
from metadata import sample_metadata
from scripts.helpful_scripts import OPENSEA_FORMAT, get_account


section_metadata_dic = {
    "SectionOne": "ipfs://Qmdmx4WFF5b8e5bGmJPdWVszHnX6kTtjfHLjkLXJKNdHav?filename=0.json",
    "SectionTwo": "",
    "SectionThree": "",
}

def main():
    print(network.show_active())
    section_one = SectionOne[len(SectionOne) - 1]
    number_of_section_one_tickets = section_one.count()
    print(
        "The number of tokens you've deployed is: "
        + str(number_of_section_one_tickets)
    )
    for token_id in range(number_of_section_one_tickets):
        if not section_one.tokenURI(token_id).startswith("https://"):
            print("Setting tokenURI of {}".format(token_id))
            set_tokenURI(token_id, section_one,
                         section_metadata_dic["SectionOne"])
        else:
            print("Skipping {}, we already set that tokenURI!".format(token_id))


def set_tokenURI(token_id, nft_contract, tokenURI):
    acount = get_account()
    nft_contract.setBaseURI(tokenURI, {"from": acount})
    print(
        "Awesome! You can view your Ticket at {}".format(
            OPENSEA_FORMAT.format(nft_contract.address, token_id)
        )
    )
    print('Please give up to 20 minutes, and hit the "refresh metadata" button')