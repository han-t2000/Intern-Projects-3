using Microsoft.AspNetCore.Mvc;

namespace NumberFlip.Controllers;

[ApiController]
public class NumberGeneratorController : ControllerBase
{
    public static Random rnd = new();
    public static int RandomNumberGeneratorCheque() => Global.InitialCheque += rnd.Next(20);
    public static int RandomNumberGeneratorOnline() => Global.InitialOnline += rnd.Next(100);
    public static int RandomNumberGeneratorATM() => Global.InitialATM += rnd.Next(50);
    public static int RandomNumberGeneratorCard() => Global.InitialCard += rnd.Next(100);
    public static int RandomNumberGeneratorRemittance() => Global.InitialRemittance += rnd.Next(40);

    [Route("api/NumberGenerator/Cheque")]
    [HttpGet]
    public ActionResult GetChequeData()
    {
        var latestValue = RandomNumberGeneratorCheque();

        while (latestValue < Global.OldValueCheque) latestValue = RandomNumberGeneratorCheque();

        Global.OldValueCheque = latestValue;

        return Ok(latestValue);
    }

    [Route("api/NumberGenerator/Online")]
    [HttpGet]
    public ActionResult GetOnlineData()
    {
        var latestValue = RandomNumberGeneratorOnline();

        while (latestValue < Global.OldValueOnline) latestValue = RandomNumberGeneratorOnline();

        Global.OldValueOnline = latestValue;

        return Ok(latestValue);
    }

    [Route("api/NumberGenerator/ATM")]
    [HttpGet]
    public ActionResult GetATMData()
    {
        var latestValue = RandomNumberGeneratorATM();

        while (latestValue < Global.OldValueATM) latestValue = RandomNumberGeneratorATM();

        Global.OldValueATM = latestValue;

        return Ok(latestValue);
    }

    [Route("api/NumberGenerator/Card")]
    [HttpGet]
    public ActionResult GetNumberCardData()
    {
        var latestValue = RandomNumberGeneratorCard();

        while (latestValue < Global.OldValueCard) latestValue = RandomNumberGeneratorCard();

        Global.OldValueCard = latestValue;

        return Ok(latestValue);
    }

    [Route("api/NumberGenerator/Remittance")]
    [HttpGet]
    public ActionResult GetRemittanceData()
    {
        var latestValue = RandomNumberGeneratorRemittance();

        while (latestValue < Global.OldValueRemittance) latestValue = RandomNumberGeneratorRemittance();

        Global.OldValueRemittance = latestValue;

        return Ok(latestValue);
    }
}

