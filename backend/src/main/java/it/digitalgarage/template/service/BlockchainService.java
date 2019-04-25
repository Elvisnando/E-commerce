package it.digitalgarage.template.service;

import it.digitalgarage.template.repository.CartRepository;
import it.digitalgarage.template.repository.CoinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;

import java.math.BigDecimal;
import java.math.BigInteger;

@Service
@Transactional
public class BlockchainService {

    @Autowired
    private CoinRepository coinRepository;
    @Autowired
    private CartRepository cartRepository;

    Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:7545/"));

    BigInteger initialSupply = new BigInteger("100000000000000000000000000");
    String tokeName = "PENTACOIN";
    String tokenSymbol = "PTC";
    BigInteger numberOfZeros = BigInteger.valueOf(18);
    BigInteger gasprice = BigInteger.valueOf(0);
    BigInteger gaslimit = BigInteger.valueOf(6721975);
    BigDecimal wei = new BigDecimal("1000000000000000000");
    BigInteger amountInWei;
    BigDecimal amount;
    String contractAdd = "0xe2a66b7c42e4849f6c7a3df2f7e05fcc9b3ea5f3";

    public void sendCoin(Long id) throws Exception {
        String transactionHash;

        System.out.println(coinRepository.findByUserID(id).getPrivKey());
        Credentials credentials = Credentials.create(coinRepository.findByUserID(id).getPrivKey());

        PCoin2 pentaCoin = new PCoin2(contractAdd, web3j, credentials, gasprice, gaslimit);
        System.out.println("sending transaction");
        for(int i=0; i< cartRepository.findAllByUserId(id).size(); i++){
            BigDecimal quantity = new BigDecimal(cartRepository.findAllByUserId(id).get(i).getQuantity());
            BigDecimal price = cartRepository.findAllByUserId(id).get(i).getProduct().getPrice();
            amount = quantity.multiply(price);

            String to = coinRepository.findByUserID(cartRepository.findAllByUserId(id).get(i).getProduct().getSellerId()).getAddress();

            amountInWei = (amount.multiply(wei)).toBigInteger();
            System.out.println(amountInWei);
            TransactionReceipt transactionReceipt = pentaCoin.transfer(to, amountInWei).send();

            transactionHash = transactionReceipt.getTransactionHash();
            System.out.println(transactionHash);
            }
    }


    public String buyToken() throws Exception{
        Credentials credentials = Credentials.create("9f3b1030a4aa6379b38fdb5b1ecb1dbb0b9e26e1f21000df8b9fde5e2d1d214d");
        PCoin2 pentaCoin = new PCoin2(contractAdd, web3j, credentials, gasprice, gaslimit);
        BigInteger buy = new BigInteger("100000000000000000");
        TransactionReceipt transactionReceipt = pentaCoin.buyTokens(buy).send();
        String transactionHash = transactionReceipt.getTransactionHash();
        return transactionHash;
    }


    public String deployContract() throws Exception {
        Credentials credentials = Credentials.create("ffe3990ccc5bef9772023c6491bac444b1db902663baf3a53d9f851dede9a091");
        String newContractAddress = "";

        //Deploy contract to address specified by wallet
        PCoin2 contract = PCoin2.deploy(
                this.web3j,
                credentials,
                gasprice,
                gaslimit,
                initialSupply, tokeName, tokenSymbol,numberOfZeros).send();

        //Het the address
        newContractAddress = contract.getContractAddress();
        System.out.println(newContractAddress);
        return newContractAddress;
    }
}
