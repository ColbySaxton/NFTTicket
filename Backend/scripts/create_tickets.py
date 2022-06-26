from brownie import SectionOne, SectionTwo, SectionThree, network
from scripts.helpful_scripts import OPENSEA_FORMAT, get_account

sample_token_uri = ""

def CreateOne():
    account = get_account()
    print(network.show_active())
    section_one = SectionOne[len(SectionOne) - 1]
    token_id = section_one.count()
    transaction = section_one.pause(False, {"from": account})
    transaction.wait(1)
    ticket_price = section_one.getTicketPrice()
    print(f"The current ticket price is ${ticket_price}")
    transaction = section_one.mint(account, {"value": ticket_price, "from": account})
    transaction.wait(1)
    print(
        "You can view your Ticket at {}".format(
            OPENSEA_FORMAT.format(section_one.address, token_id)
        )
    )
    print('Please give up to 20 minutes, and hit the "refresh metadata" button')

def CreateTwo():
    account = get_account()
    print(network.show_active())
    section_two = SectionTwo[len(SectionTwo) - 1]
    token_id = section_two.count()
    transaction = section_two.pause(False, {"from": account})
    transaction.wait(1)
    ticket_price = section_two.getTicketPrice()
    print(f"The current ticket price is ${ticket_price}")
    transaction = section_two.mint(account, {"value": ticket_price, "from": account})
    transaction.wait(1)
    print(
        "You can view your Ticker at {}".format(
            OPENSEA_FORMAT.format(section_two.address, token_id)
        )
    )
    print('Please give up to 20 minutes, and hit the "refresh metadata" button')

def CreateThree():
    account = get_account()
    print(network.show_active())
    section_three = SectionThree[len(SectionThree) - 1]
    token_id = section_three.count()
    transaction = section_three.pause(False, {"from": account})
    transaction.wait(1)
    ticket_price = section_three.getTicketPrice()
    print(f"The current ticket price is ${ticket_price}")
    transaction = section_three.mint(account, {"value": ticket_price, "from": account})
    transaction.wait(1)
    print(
        "You can view your NFT at {}".format(
            OPENSEA_FORMAT.format(section_three.address, token_id)
        )
    )
    print('Please give up to 20 minutes, and hit the "refresh metadata" button')

def main():
    CreateOne()