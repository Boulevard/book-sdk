import type { Scalars, Maybe } from "../graph";
import { Node, PlatformClient } from "../platformClient";
import type * as Graph from "../graph";
import { Cart } from "../cart";
import * as graph from "./graph";

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

export enum CartBookingQuestionSchema {
  Client = "CLIENT",
  Appointment = "APPOINTMENT"
}

const answerToInput = (
  valueType: CartBookingQuestionValueType,
  answer:
    | string
    | number
    | boolean
    | CartBookingQuestionOption
    | CartBookingQuestionOption[]
): Graph.CartBookingQuestionAnswerInput => {
  switch (valueType) {
    case CartBookingQuestionValueType.Boolean:
      // @ts-expect-error Pending API-210
      return { booleanValue: answer };
    case CartBookingQuestionValueType.Datetime:
      return { datetimeValue: answer };
    case CartBookingQuestionValueType.Float:
      const floatValue = answer as number;
      return { floatValue };
    case CartBookingQuestionValueType.Integer:
      const integerValue = answer as number;
      return { integerValue };
    case CartBookingQuestionValueType.Multiselect:
      const options = answer as CartBookingQuestionOption[];
      return { optionValues: options.map(o => ({ optionId: o.id })) };
    case CartBookingQuestionValueType.Select:
      const option = answer as CartBookingQuestionOption;
      return { optionValue: { optionId: option.id } };
    case CartBookingQuestionValueType.Text:
      const textValue = answer as string;
      return { textValue };
  }
};

export class CartBookingQuestion extends Node<Graph.CartBookingQuestion> {
  answer: Maybe<CartBookingQuestionAnswer>;

  /** How the input for the booking question should be displayed. */
  displayType: CartBookingQuestionDisplayType;

  /** Validation errors for the question */
  errors: Maybe<Array<Scalars["String"]>>;

  /** Unique ID of the question */
  id: Scalars["ID"];

  /**
   * Unique key of the question. Compared to the IDs (which should
   * always be treated as opaque), this can be be interpreted by the client code.
   * Example use cases include filtering or sorting the questions on the client
   * side based on custom conditions.
   *
   * While this is non-null, this the might not have a meaningful value and
   * currently cannot be set in the UI. Please contact the developer support if
   * you need to use this field.
   */
  key: Scalars["String"];

  /** Booking question displayed label */
  label: Scalars["String"];

  /** Options for select/multiselect booking questions */
  options: Array<CartBookingQuestionOption>;

  /** Whether the answer is required to checkout */
  required: Scalars["Boolean"];

  /** Accepted type for the booking question answer. */
  valueType: CartBookingQuestionValueType;

  /** Indicates the type of entity that the booking question answer is mapped to. */
  schema: Maybe<CartBookingQuestionSchema>;

  /**
   * @internal
   * Included so that we don't have to make the `submitAnswer` call
   * from the Cart object
   */
  private cartId: Scalars["ID"];

  /**
   * Answer a booking question
   *
   * @async
   * @param answer The answer to the question, either a provided option, or a user input
   * @public
   */

  async submitAnswer(
    answer:
      | string
      | number
      | CartBookingQuestionOption
      | CartBookingQuestionOption[]
  ): Promise<Cart> {
    const input: Graph.CartBookingQuestionAddAnswerInput = {
      questionId: this.id,
      answer: answerToInput(this.valueType, answer),
      id: this.cartId
    };

    const response = await this.platformClient.request(
      graph.bookingQuestionAddAnswerMutation,
      { input }
    );

    return new Cart(this.platformClient, response.cartBookingQuestionAddAnswer.cart);
  }

  async clearAnswer(): Promise<Cart> {
    const input: Graph.CartBookingQuestionClearAnswerInput = {
      questionId: this.id,
      id: this.cartId
    };

    const response = await this.platformClient.request(
      graph.bookingQuestionClearAnswerMutation,
      { input }
    );

    return new Cart(this.platformClient, response.cartBookingQuestionClearAnswer.cart);
  }

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    bookingQuestion: Graph.CartBookingQuestion,
    cartId: Scalars["ID"]
  ) {
    super(platformClient, bookingQuestion);
    this.cartId = cartId;
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

export class CartBookingQuestionOption extends Node<
  Graph.CartBookingQuestionOption
> {
  id: Scalars["ID"];
  label: Scalars["String"];
}
