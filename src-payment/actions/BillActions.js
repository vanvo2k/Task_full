const Bill = require('../models/Bill')
const User = require('../models/User')
const Plan = require('../models/Plan')
const Moment = require('moment')
const isNumeric = require('../helpers/isNumeric')
const {Parser} = require('json2csv')

exports.getListBills = (userId) => {
    return Bill
        .find({
            owner: userId,
            status: 'completed'
        })
        .sort({updated: -1})
}

exports.getListBillsAll = ({page, limit}) => {
    const pageValidated = isNumeric(page) ? parseInt(page, 10) : 1
    const limitValidated = isNumeric(limit) ? parseInt(limit, 10) : 10
    const from = (pageValidated - 1) * limitValidated

    const query = {
        status: 'completed'
    }

    return Promise.all([
        Bill.count(query),
        Bill.find(query)
            .populate('owner', User)
            .populate('plan', Plan)
            .sort({created: -1})
            .skip(from)
            .limit(limitValidated)
    ]).then(([total, docs]) => {
        const pages = Math.ceil(total / limitValidated) || 1

        const bills = docs
            .filter(doc => doc.get('owner'))
            .filter(doc => doc.get('plan'))
            .map(doc => {
                const user = doc.get('owner')
                const plan = doc.get('plan')
                const object = doc.toJSON()

                return Object.assign({}, object, {
                    owner: {
                        _id: user.get('_id'),
                        email: user.get('email'),
                        name: user.get('profile.name'),
                    },
                    plan: {
                        _id: plan.get('_id'),
                        title: plan.get('title'),
                        price: plan.get('price'),
                        slug: plan.get('slug'),
                    }
                })
            })

        return {
            docs: bills,
            total,
            pages,
            page: pageValidated,
            limit: limitValidated
        }
    })
}

exports.exportAffiliate = async ({userId}) => {
    // find affiliate code of user
    const user = await User.findById(userId).select('affiliateCode').lean()
    if (!user.affiliateCode) throw new Error('Affiliate code not found')
    // find all bill of affiliate code
    const bills = await Bill.find({
        affiliate: user.affiliateCode,
        status: 'completed'
    })
    .populate('owner', User)
    .populate('plan', Plan)
    .lean()
    if (!bills || !bills.length) throw new Error('There is no bill!')

    const totalBills = bills.map(bill => {
        const user = bill.owner
        const plan = bill.plan
        return {
            affiliate: bill.affiliate,
            email: user.email,
            plan: plan.title,
            price: plan.price,
            register_date: Moment(bill.updated).format( "MMMM D, YYYY")
        }
    })
    const fields = [
        {
            label: 'Affiliate Code',
            value: 'affiliate'
        },
        {
            label: 'Email',
            value: 'email'
        },
        {
            label: 'Plan',
            value: 'plan'
        },
        {
            label: 'Price($)',
            value: 'price'
        },
        {
            label: 'Register Date',
            value: 'register_date'
        },
    ]


    const json2csvParser = new Parser({fields})
    const content = json2csvParser.parse(totalBills)


    return content
}

exports.getListAffiliates = async ({ userId, page, limit }) => {
  const user = await User.findById(userId).select("affiliateCode").lean();
  if (!user.affiliateCode) throw new Error("Affiliate code not found");

  const pageValidated = isNumeric(page) ? parseInt(page, 10) : 1;
  const limitValidated = isNumeric(limit) ? parseInt(limit, 10) : 10;

  const from = (pageValidated - 1) * limitValidated;

  const query = {
    affiliate: user.affiliateCode,
    status: "completed",
  };

  return Promise.all([
    Bill.count(query),
    Bill.find(query)
      .populate("owner", User)
      .populate("plan", Plan)
      .sort({ created: 1 })
      .skip(from)
      .limit(limitValidated),
  ]).then(([total, bills]) => {
    if (!bills || !bills.length) throw new Error("There is no bill!");
    const pages = Math.ceil(total / limitValidated) || 1;
    const affiliates = bills
      .map((bill) => {
        const user = bill.owner;
        if (!user || (typeof user === 'object' && Object.keys(user).length === 0)) {
            console.log(`BillActions.getListAffiliates IN payment-services: bill ${bill._id} has wrong 'owner' in database`)
            return undefined
        }

        const plan = bill.plan;
        if (!plan || (typeof plan === 'object' && Object.keys(plan).length === 0)) {
            console.log(`BillActions.getListAffiliates IN payment-services: bill ${bill._id} has wrong 'plan' in database`)
            return undefined
        }

        return {
            code: bill.affiliate,
            email: user.email,
            plan: plan.title,
            price: plan.price,
            register_date: bill.updated,
        };
      })
      .filter(item => typeof item !== 'undefined')

    return {
      affiliates,
      pages,
      page: pageValidated,
      limit: limitValidated,
    };
  });
};
