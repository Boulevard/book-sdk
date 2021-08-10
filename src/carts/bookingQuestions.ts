import type { Scalars, Maybe } from "../graph";
import { Node, PlatformClient } from "../platformClient";
import type * as Graph from "../graph";

export enum CartBookingQuestionDisplayType {
  Boolean = "BOOLEAN",
  Datetime = "DATETIME",
  Float = "FLOAT",
  Integer = "INTEGER",
  LongText = "LONG_TEXT",
  Multiselect = "MULTISELECT",
  Select = "SELECT",
  ShortText = "SHORT_TEXT"
}

export enum CartBookingQuestionValueType {
  Boolean = "BOOLEAN",
  Datetime = "DATETIME",
  Float = "FLOAT",
  Integer = "INTEGER",
  Multiselect = "MULTISELECT",
  Select = "SELECT",
  Text = "TEXT"
}

export class CartBookingQuestion extends Node<Graph.CartBookingQuestion> {
  answer: Maybe<CartBookingQuestionAnswer>;

  /** How the input for the booking question should be displayed. */
  displayType: CartBookingQuestionDisplayType;

  /** Validation errors for the question */
  errors: Maybe<Array<Scalars["String"]>>;

  /** Unique ID of the question */
  id: Scalars["ID"];

  /** Booking question displayed value */
  label: Scalars["String"];

  /** Options for select/multiselect booking questions */
  options: Array<CartBookingQuestionOption>;

  /** Whether the answer is required to checkout */
  required: Scalars["Boolean"];

  /** Accepted type for the booking question answer. */
  valueType: CartBookingQuestionValueType;

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    bookingQuestion: Graph.CartBookingQuestion
  ) {
    super(platformClient, bookingQuestion);
    switch (bookingQuestion.answer?.__typename) {
      case "CartBookingQuestionTextAnswer":
        this.answer = new CartBookingQuestionTextAnswer(
          platformClient,
          bookingQuestion.answer
        );
        break;
      case "CartBookingQuestionIntegerAnswer":
        this.answer = new CartBookingQuestionIntegerAnswer(
          platformClient,
          bookingQuestion.answer
        );
        break;
      case "CartBookingQuestionBooleanAnswer":
        this.answer = new CartBookingQuestionBooleanAnswer(
          platformClient,
          bookingQuestion.answer
        );
        break;
      case "CartBookingQuestionFloatAnswer":
        this.answer = new CartBookingQuestionFloatAnswer(
          platformClient,
          bookingQuestion.answer
        );
        break;
      case "CartBookingQuestionDatetimeAnswer":
        this.answer = new CartBookingQuestionDatetimeAnswer(
          platformClient,
          bookingQuestion.answer
        );
        break;
      case "CartBookingQuestionSelectAnswer":
        this.answer = new CartBookingQuestionSelectAnswer(
          platformClient,
          bookingQuestion.answer
        );
      case "CartBookingQuestionMultiSelectAnswer":
        this.answer = new CartBookingQuestionMultiSelectAnswer(
          platformClient,
          bookingQuestion.answer as Graph.CartBookingQuestionMultiSelectAnswer
        );
        break;
      default:
        break;
    }
    this.options = bookingQuestion.options.map(
      option => new CartBookingQuestionOption(platformClient, option)
    );
  }
}

export type CartBookingQuestionAnswer =
  | CartBookingQuestionTextAnswer
  | CartBookingQuestionIntegerAnswer
  | CartBookingQuestionBooleanAnswer
  | CartBookingQuestionFloatAnswer
  | CartBookingQuestionDatetimeAnswer
  | CartBookingQuestionSelectAnswer
  | CartBookingQuestionMultiSelectAnswer;


export class CartBookingQuestionTextAnswer extends Node<
  Graph.CartBookingQuestionTextAnswer
> {
  textValue: Scalars["String"];
}


export class CartBookingQuestionIntegerAnswer extends Node<
  Graph.CartBookingQuestionIntegerAnswer
> {
  integerValue: Scalars["Int"];
}


export class CartBookingQuestionBooleanAnswer extends Node<
  Graph.CartBookingQuestionBooleanAnswer
> {
  booleanValue: Scalars["Boolean"];
}


export class CartBookingQuestionFloatAnswer extends Node<
  Graph.CartBookingQuestionFloatAnswer
> {
  floatValue: Scalars["Float"];
}


export class CartBookingQuestionDatetimeAnswer extends Node<
  Graph.CartBookingQuestionDatetimeAnswer
> {
  datetimeValue: Scalars["DateTime"];
}

export class CartBookingQuestionSelectAnswer extends Node<
  Graph.CartBookingQuestionSelectAnswer
> {
  option: CartBookingQuestionOption;

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    bookingQuestionSelectAnswer: Graph.CartBookingQuestionSelectAnswer
  ) {
    super(platformClient, bookingQuestionSelectAnswer);
    this.option = new CartBookingQuestionOption(
      platformClient,
      bookingQuestionSelectAnswer.option
    );
  }
}

export class CartBookingQuestionMultiSelectAnswer extends Node<
  Graph.CartBookingQuestionMultiSelectAnswer
> {
  options: Array<CartBookingQuestionOption>;

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    bookingQuestionMultiSelectAnswer: Graph.CartBookingQuestionMultiSelectAnswer
  ) {
    super(platformClient, bookingQuestionMultiSelectAnswer);
    this.options = bookingQuestionMultiSelectAnswer.options.map(
      option => new CartBookingQuestionOption(platformClient, option)
    );
  }
}


export class CartBookingQuestionOption extends Node<Graph.CartBookingQuestionOption> {
  id: Scalars["ID"];
  label: Scalars["String"];
}
