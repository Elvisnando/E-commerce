package it.digitalgarage.template.controller;

import io.swagger.annotations.ApiImplicitParam;
import it.digitalgarage.template.service.BlockchainService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.*;
import org.web3j.protocol.http.HttpService;

import java.security.Principal;
import java.util.concurrent.ExecutionException;



@RestController
@RequestMapping(path = "/blockchain")
public class BlockChainController {

    @Autowired
    private BlockchainService blockchainService;


    Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:7545/"));

    @Async
    @RequestMapping(path = "/sendTransaction", method = RequestMethod.GET)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public void pentacoinPayments(Principal token) throws Exception {
        System.out.println("pentacoin payment controller");
        Long id = Long.parseLong(token.getName());
        System.out.println("id" + id);
        blockchainService.sendCoin(id);
    }


    @RequestMapping(path = "/deploy", method = RequestMethod.GET)
    public String deployContract() throws Exception {
        return blockchainService.deployContract();
    }


    @RequestMapping(path = "/buyToken", method = RequestMethod.GET)
    public String buyPentaCoinToken() throws Exception{
        return blockchainService.buyToken();
    }



    //getting a block number
    @RequestMapping(path = "/blockNumber", method = RequestMethod.GET)
    public EthBlockNumber getBlockNumber() throws InterruptedException, ExecutionException {
        EthBlockNumber result;
        result = this.web3j.ethBlockNumber()
                .sendAsync().get();
        return result;
    }

    //getting ethereum address accounts
    @RequestMapping(path = "/account", method = RequestMethod.GET)
    public EthAccounts getEthAccounts() throws InterruptedException, ExecutionException  {
        EthAccounts result;
        System.out.println(this.web3j.ethAccounts());
        result = this.web3j.ethAccounts()
                .sendAsync()
                .get();
        return result;
    }

    //number of transaction of a given account
    @RequestMapping(path = "/numTransaction", method = RequestMethod.GET)
    public EthGetTransactionCount getTransactionCount()  throws InterruptedException, ExecutionException {
        EthGetTransactionCount result;
        String addressToCheck = "0xd0fb5b3a67cf2b2e2c4242c30771ffca0c1d8768";
        result = this.web3j.ethGetTransactionCount(addressToCheck,
                DefaultBlockParameter.valueOf("latest"))
                .sendAsync()
                .get();
        return result;
    }

    @RequestMapping(path = "/getBalance", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public EthGetBalance getEthBalance() throws InterruptedException, ExecutionException {
        EthGetBalance result;
        String addressToCheck = "0xD0fb5B3A67CF2B2e2c4242C30771FFCA0C1D8768";
        result = this.web3j.ethGetBalance(addressToCheck,
                DefaultBlockParameter.valueOf("latest"))
                .sendAsync()
                .get();
        return result;
    }
}
