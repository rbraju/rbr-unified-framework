package com.rbr.perf

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class SimpleSimulation extends Simulation {

  val httpProtocol = http.baseUrl("https://jsonplaceholder.typicode.com")

  val scn = scenario("Simple GET Users")
    .exec(
      http("Get Users")
        .get("/users")
        .check(status.is(200))
    )

  setUp(
    scn.inject(atOnceUsers(1))
  ).protocols(httpProtocol)
}
